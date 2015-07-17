include("ft_array");

function ft_getAdjacentsCells(cell)
{
	/*
	* Returns an array of all id adjacent cells
	*/
	var adj;
	var x;
	var y;

	adj = [];
	x   = getCellX(cell);
	y   = getCellY(cell);

	if (cell = getCellFromXY(x - 1, y)) push(adj, cell);
	else if (cell = getCellFromXY(x + 1, y)) push(adj, cell);
	else if (cell = getCellFromXY(x, y - 1)) push(adj, cell);
	else if (cell = getCellFromXY(x, y + 1)) push(adj, cell);
	
	return adj;
}

function ft_getReachableMap(@next, @map, @queue, cell, @ignore, @MP)
{
	/*
	* Returns map
	*/
	var nextLeft;
	var nextCell;
	var nextCellContent;

	nextLeft = count(next);
	while (nextLeft--) {
		nextCell = next[nextLeft];
		nextCellContent = getCellContent(nextCell);
		if (nextCellContent === CELL_OBSTACLE);
		else if (nextCellContent === CELL_PLAYER);
		else if (!inArray(ignore, getLeekOnCell(nextCell)));
		else if ((map[nextCell] === -1) || (map[nextCell] > map[cell] + 1));
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


function ft_getReachableCells(cell, MP, ignore)
{
	/*
	* Returns an array of all id reachable cells
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
	* Returns an array of all id reachable cells by leek
	*/
	return ft_getReachableCells(getCell(leek), getMP(leek), ignore);
}

function ft_getSafeCells(cell, MP)
{
	/*
	* Returns an array of all id safe cells
	*/
	var safe;
	var next;
	var reachable;
	var weapon;
	var ignore;
	var target;
	var ccell;

	/*
	safe = ft_getReachableCells(cell, MP, [getLeek()]);
	for (var enemy in getAliveEnemies()) 
	{
		ignore = subArray(next, 0, search(next, enemy));
		reachable = ft_getReachableCellsBy(enemy, ignore);
		weapon = getWeapon(enemy);
		for (ccell in reachable) 
		{
			for (target in safe)
			{
				if (ft_can_use_weapon(weapon, leek, ccell)) 
				{
					removeElement(safe, target);
				}
			}
		}
	}
	mark(safe, COLOR_GREEN);
	return safe;
	*/
}
