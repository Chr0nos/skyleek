include("ft_array");
include("ft_weapon");
include("ft_leeks");
include("main");

/**
renvoi true si la cell est valide
@level 1
@return bool
*/
function ft_cell_isValid(cell)
{
	if (cell === null) return false;
	if ((cell < 1) || (cell > 612)) return false;
	return true;
}

/**
renvoi les cellules adjacentes directes
maxium 4 cells
@level 21
@ops ~50
@param cell la cellule
@return array
*/
function ft_getAdjacentsCells(cell)
{
	var adj = [];
	var x;
	var y;
	var n;
	var theoric_cells = [];

	x   = getCellX(cell);
	y   = getCellY(cell);

	push(theoric_cells, getCellFromXY(x, y + 1));
	push(theoric_cells, getCellFromXY(x, y - 1));
	push(theoric_cells, getCellFromXY(x + 1, y));
	push(theoric_cells, getCellFromXY(x - 1, y));

	n = count(theoric_cells);
	for (var ccell in theoric_cells)
	{
		if ((ft_cell_isValid(ccell)) && (!isObstacle(ccell)))
		{
			push(adj, ccell);
		}
	}
	return adj;
}

/**
renvois la carte de toutes les cells adjacentes pour chaque cell
sous la forme de array[cell] = array
@level 21
@ops ~30700
@return array
*/
function ft_cell_getAllAdjacentsCells()
{
	var cell;
	var cells = [];

	cell = 614;
	while (cell--)
	{
		cells[cell] = ft_getAdjacentsCells(cell);
	}
	return cells;
}

/**
permet de récuperer les cellules dans le radius de leekCell
il est tout à fait possible d'avoir un tableau cells deja pré-remplis
aux quel cas il est sans doute préferable de peupler le ignore en conséquence
si vous utilisez plusieures fois cette fonction: re-utilisez le meme ignore
@ops variables
@level 21
@param leekCell la cellule de dépard (const)
@param mp le radius (généralement getMP pour un leek)
@param acm la AdjacentsCellsMap (pré-calculée)
@param cells array de cells, vide à l'entrée de la fonction
@param ignore array de cells à ignorer: passer [] (array vide) a la fonction
@return rien le retour est dans le array cells
*/
function ft_cell_getZone(@leekCell, mp, @cells, @acm, @ignore)
{
	if (mp--)
	{
		for (var cell in acm[leekCell])
		{
			if (ignore[cell]);
			else if (!isEmptyCell(cell)) ignore[cell] = true;
			else
			{
				push(cells, cell);
				ignore[cell] = true;
				ft_cell_getZone(cell, mp, cells, acm, ignore);
			}
		}
	}
}

/**
peuple cells avec le radius autours de leekCell
la map à pour CLEES les cellules et pour valeur true
tel que : map[cellule] = true
@param leekCell centre de la zone
@param mp radius de la zone
@param cells tableau de retour pour les cells
@param acm AdjacentCellsMap
@return null
*/

function ft_cell_getZoneMap(@leekCell, mp, @cells, @acm)
{
	if (mp--)
	{
		for (var cell in acm[leekCell])
		{
			if (cells[cell]);
			else if (isEmptyCell(cell))
			{
				cells[cell] = true;
				ft_cell_getZoneMap(leekCell, mp, cells, acm);
			}
		}
	}
}

function ft_getSafeCells(cell, MP, @acm)
{
	/*
	** Returns an array of all id safe cells
	*/
	var safe;
	var next = [];
	var reachable;
	var weapon;
	var ignore;
	var target;
	var cCell;

	next = ft_getNextTurn();
	ft_cell_getZone(cell, MP, acm, safe, ignore);
	for (var enemy in getAliveEnemies()) 
	{
		ignore = subArray(next, 0, search(next, enemy));
		ft_cell_getZone(enemy, MP, acm, reachable, ignore);
		weapon = getWeapon(enemy);
		for (cCell in reachable) 
		{
			for (target in safe)
			{
				if (ft_can_use_weapon(weapon, getLeekOnCell(cCell), target)) 
				{
					removeElement(safe, target);
				}
			}
		}
	}
	return safe;
}

/**
renvoi les cellules sur les chemins enemies
@level 37
@ops variables
@return array de cells
*/
function ft_cell_getEnemiesPaths()
{
	var paths = [];
	var cell;

	for (var enemy in getAliveEnemies())
	{
		cell = getCell(enemy);
		pushAll(paths, getPath(cell, getCell(ft_getNearestEnemyTo(cell))));
	}
	ft_array_unique(paths);
	return paths;
}

/**
return les cellules adjacentes a la liste de leeks
ou ils peuvent se rendre avec leurs MP actuels
@level 21
@ops variables
@param leeks array des leeks à afficher
@param acm AdjacentsCellsMap pré-calculée array[cells][]
@param ignore liste des cells à ignorer, [] par defaut
@return null
*/
function ft_cell_getLeeksMoves(leeks, @acm, @ignore)
{
	var cells = [];

	for (var leek in leeks)
	{
		ft_cell_getZone(getCell(leek), getMP(leek), cells, acm, ignore);
	}
	return cells;
}

/**
renvois les cases ou les enemies peuvent faire feu
et en violet les chemin que prendrons probablement les enemis
pour arriver jusqu'a nous
@level 21
@ops variables
@param acm AdjacetsCellsMap
@param ignore liste des cells à ignorer (par default [])
@return null
*/
function ft_cell_getDangerous_cells(@acm, @ignore)
{
	/*
	** internal functionement: we check each alive enemy and get
	** his MP + weapon range, this is his "dangerous aera"
	** we add each cells to the ignore array for optimisation purposes
	*/
	var cells = [];
	var path = [];
	var range;

	for (var enemy in getAliveEnemies())
	{
		range = getMP(enemy) + getWeaponMaxScope(getWeapon(enemy));
		ft_cell_getZone(getCell(enemy), range, cells, acm, ignore);
		for (var tmp in cells) ignore[tmp] = true;
	}
	return cells;
}

/**
créé une map des cellules ou un leek peut se rendre
la map à la forme de map[cellcules] = true
@level 21
@return array
*/
function ft_cell_getWalkableMap()
{
	var cell;
	var map = [];
	var content;

	cell = 612;
	while (cell--)
	{
		content = getCellContent(cell);
		if (content == CELL_EMPTY) map[cell] = true;
	}
	return map;
}
