include("ft_array");
include("ft_weapon");
include("ft_leeks");

function ft_cell_isWalkable(cell)
{
	var content;

	content = getCellContent(cell);
	if ((cell < 0) || (cell > 613)) return false;
	else if (content == CELL_OBSTACLE) return false;
	else if (content == CELL_PLAYER) return false;
	return true;
}

function ft_getAdjacentsCells(cell)
{
	/*
	** Returns an array of all id adjacent cells
	*/
	var adj = [];
	var x;
	var y;
	var n;
	var theoric_cells = [];
	var ccell;

	x   = getCellX(cell);
	y   = getCellY(cell);
	theoric_cells = [ getCellFromXY(x, y + 1), getCellFromXY(x, y -1 ),
					  getCellFromXY(x + 1, y), getCellFromXY(x - 1, y) ];
	n = 4;
	while (n--)
	{
		ccell = theoric_cells[n];
		if (ft_cell_isWalkable(ccell))
		{
			push(adj, ccell);
		}
	}
	return adj;
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
