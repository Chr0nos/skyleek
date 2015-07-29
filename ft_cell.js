include("ft_array");
include("ft_weapon");
include("ft_leeks");

/**
@level 21
@return true si un leek peut s'y rendre, sinon false
*/
function ft_cell_isWalkable(cell)
{
	var content;

	content = getCellContent(cell);
	if (content != CELL_EMPTY) return false;
	return true;
}

/**
renvoi true si la cell est valide
@level 1
@return bool
*/
function ft_cell_isValid(cell)
{
	if (cell === null) return false;
	if ((cell < 0) || (cell > 613)) return false;
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
function ft_cell_getReachableCells(@leekCell, mp, @cells, @acm, @ignore)
{
	if (mp--)
	{
		for (var cell in acm[leekCell])
		{
			if (ignore[cell]);
			else if (!ft_cell_isWalkable(cell)) ignore[cell] = true;
			else
			{
				push(cells, cell);
				ignore[cell] = true;
			}
			ft_cell_getReachableCells(cell, mp, cells, acm, ignore);
		}
	}
}

function ft_getReachableMap(@next, @map, @queue, cell, @ignore, @MP)
{
	/*
	** Returns map
	** ignore is an array of leeks ids
	*/
	var nextLeft;
	var nextCell;
	var nextCellContent;

	nextLeft = count(next);
	while (nextLeft--)
	{
		nextCell = next[nextLeft];
		if (!ft_cell_isWalkable(nextCell));
		else if (!inArray(ignore, getLeekOnCell(nextCell)));
		else
		{
			map[nextCell] = map[cell] + 1;
			if (map[nextCell] < MP)
			{
				push(queue, nextCell);
			}
		}
	}
}

function ft_getReachableCells(cell, @MP, @ignore)
{
	/*
	** Returns an array of all id reachable cells
	*/
	var queue = [];
	var queueLeft;
	var map = [];
	var next;
	var walk = [];

	fill(map, -1, 613);
	map[cell] = 0;
	push(queue, cell);
	queueLeft = count(queue);
	while (queueLeft--)
	{
		cell = shift(queue);
		next = ft_getAdjacentsCells(cell);
		ft_getReachableMap(next, map, queue, cell, ignore, MP);
	}
	remove(map, ft_array_indexOf(map, -1, count(map)));
	return walk;
}

function ft_getReachableCellsBy(leek, ignore)
{
	/*
	** Returns an array of all id reachable cells by leek
	*/
	return ft_getReachableCells(getCell(leek), getMP(leek), ignore);
}

function ft_getSafeCells(cell, MP)
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
	safe = ft_getReachableCells(cell, MP, [getLeek()]);
	for (var enemy in getAliveEnemies()) 
	{
		ignore = subArray(next, 0, search(next, enemy));
		reachable = ft_getReachableCellsBy(enemy, ignore);
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
