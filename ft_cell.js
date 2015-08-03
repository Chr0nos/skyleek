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
note: si pas de borderMap ou vide alors le monde bouclera sur lui même
@level 21
@ops ~50
@param cell la cellule
@param borderMap la map des bordures de la carte au format map[cellule] = true;
@return array
*/
function ft_getAdjacentsCells(cell, @borderMap)
{
	var adj = [];
	var theoric_cells = [];
	var theoricCell;

	for (var job in ADJACENTS_CELLS_JOB)
	{
		theoricCell = cell + job;
		if (!ft_cell_isValid(theoricCell));
		else if (borderMap[cell]);
		else
		{
			push(adj, theoricCell);
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
	var borderMap = [];
	
	borderMap = ft_cell_getBorderMap();
	cell = 614;
	while (cell--)
	{
		cells[cell] = ft_getAdjacentsCells(cell, borderMap);
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
	var myCell;

	if (mp--)
	{
		myCell = getCell();
		for (var cell in acm[leekCell])
		{
			if (ignore[cell]);
			else if ((!isEmptyCell(cell)) && (myCell != cell)) ignore[cell] = true;
			else
			{
				push(cells, cell);
				ft_cell_getZone(cell, mp, cells, acm, ignore);
			}
		}
	}
}

/**
renvoi la liste des celules d'ou il est possible de tirer depuis leekCell
contrairement à ft_cell_getZone cette fonction tiens compte
du lineOfSight, de plus elle ignore les obstacles joueurs (pas les obstacles normeaux)
@param leekCell cellule courante à tester
@param mp radius en nombre de cellules
@param acm AdjacentCellsMap
@param ignore liste des cells à ignore sous forme de ignore[cellule] = true
@param shooterCell cellule d'origine (ne changera pas)
@return null
*/
function ft_cell_getShootZone(@leekCell, mp, @cells, @acm, @ignore, @shooterCell)
{
	if (mp--)
	{
		for (var cell in acm[leekCell])
		{
			if (ignore[cell]);
			else if (lineOfSight(cell, shooterCell)) ignore[cell] = true;
			else
			{
				push(cells, cell);
				ignore[cell] = true;
				ft_cell_getShootZone(cell, mp, cells, acm, ignore, shooterCell);
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
			else if ((isEmptyCell(cell)) || (getCell() == cell))
			{
				cells[cell] = true;
				ft_cell_getZoneMap(leekCell, mp, cells, acm);
			}
		}
	}
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
	var allyTarget;
	var allys = [];

	allys = getAliveAllies();
	for (var enemy in getAliveEnemies())
	{
		cell = getCell(enemy);
		allyTarget = ft_cell_getNearestLeek(allys, cell);
		pushAll(paths, getPath(cell, getCell(allyTarget)));
	}
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
	var radiusCells = [];
	var shootCells = [];
	var range;
	var cell;
	var radiusIgnore = [];
	var shootIgnore = [];

	ignore = OBSTACLES_MAP;
	radiusIgnore = ignore;
	for (var enemy in getAliveEnemies())
	{
		cell = getCell(enemy);
		range = getWeaponMaxScope(getWeapon(enemy));
		ft_cell_getZone(cell, getMP(enemy), radiusCells, acm, ignore);
		radiusIgnore[cell] = true;
		for (var reachableCell in radiusCells)
		{
			ft_cell_getShootZone(reachableCell, range,
								shootCells, acm, shootIgnore, cell);
			shootIgnore[reachableCell] = true;
		}
	}
	return shootCells;
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

/**
renvoi la liste des cellules de bordure de la map
sous la forme de array[cell] = true;
@level 1
@return array
*/
function ft_cell_getBorderMap()
{
	var cellsMap = [];
	var pos;
	var pas;
	var max;
	var jobList = [];

	jobList = [ [ 0, 17, 1 ], [ 35, 595, 35 ], [ 17, 612, 35 ], [ 595, 612, 1 ] ];
	for (var job in jobList)
	{
		pos = job[0];
		max = job[1];
		pas = job[2];
		while (pos <= max)
		{
			cellsMap[pos] = true;
			pos += pas;
		}
	}
	return cellsMap;
}

/**
retourne la liste de cells pour la liste de leeks
@param leeks liste de leeks
@return array de cells
*/
function ft_cell_getLeeksCells(leeks)
{
	var cells = [];

	for (var leek in leeks)
	{
		push(cells, getCell(leek));
	}
	return cells;
}

/**
retourne le radius maximum d'une zone de cellules
@param cells la liste des cellule à tester (array)
@param root la cellule au centre
@return int
*/
function ft_cell_getMaxRadiusForCells(@cells, root)
{
	var radius;
	var dist;

	for (var cell in cells)
	{
		dist = getDistance(cell, root);
		if (dist > radius) radius = dist;
	}
	return radius;
}

/**
renvoi le périmetre d'une zone au format array(cell1, cell2, ...)
@param zone la zone à traiter
@param acm AdjacentCellMap
@return array de cells
@level 1
@ops variables
*/
function ft_cell_getPerimeterOfZone(@zone, @acm)
{
	var dist;
	var border;
	var borderCells = [];
	var zoneMap = [];

	zoneMap = ft_array_valuesToMap(zone);
	for (var cell in zone)
	{
		border = false;
		for (var x in acm[cell])
		{
			if (!zoneMap[x])
			{
				border = true;
				break;
			}
		}
		if (border) push(borderCells, cell);
	}
	return borderCells;
}

/**
renvoi l'id du leek le plus proche de cell
@level 37
@ops variables
@param cell la cellule d'ou compter la distance
@param leeks le array de leeks à tester
@return leekId du leek le plus proche de cell
*/
function ft_cell_getNearestLeek(@leeks, cell)
{
	var dist;
	var tmpDist;
	var closestLeek;

	dist = 612;
	for (var leek in leeks)
	{
		tmpDist = getPathLength(cell, getCell(leek));
		if (tmpDist < dist)
		{
			dist = tmpDist;
			closestLeek = leek;
		}
	}
	return closestLeek;
}
