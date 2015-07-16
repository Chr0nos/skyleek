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


function ft_getReachableMap(@next, @map, @queue, cell)
{
	/*
	* Returns map
	*/
	var nextLeft;
	var nextCell;
	var nextCellContent;

	nextLeft = count(next);
	while (nextLeft--) {
		nextCell = next[i];
		nextCellContent = getCellContent(nextCell);
		if (nextCellContent === CELL_OBSTACLE);
		else if (nextCellContent === CELL_PLAYER);
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

function ft_getReachableCells(cell, MP)
{
	/*
	* Returns an array of all id reachable cells
	*/
	var queue = [];
	var queueLeft;
	var map = [];
	var next;
	var walk = [];
	var i;

	fill(map, -1, 613);
	map[cell] = 0;
	push(queue, cell);
	queueLeft = count(queue);
	while (queueLeft--)
	{
		cell = shift(queue);
		next = ft_getAdjacentsCells(cell);
		ft_getReachableMap(next, map, queue, cell);
	}
	remove(map, ft_array_indexOf(map, -1));
	return walk;
}

function ft_getSafeCells(cell, MP)
{
	/*
	* Returns an array of all id safe cells
	*/
	var safe;
	var next;

	safe = ft_getReachableCells(cell, MP);
}