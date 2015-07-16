/*
 * Returns an array of all id adjacent cells
 */
function ft_getAdjacentsCells(cell)
{
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

/*
 * Returns an array of all id reachable cells
 */
function ft_getReachableCells(cell, MP)
{
	var queue;
	var map;

	var next;
	var walk;
	var i;

	queue = [];
	map = [];

	fill(map, -1, 613);
	map[cell] = 0;
	
	push(queue, cell);

	while(count(queue)) {
		cell = shift(queue);
		next = ft_getAdjacentsCells(cell);

		for(i = 0; i < count(next); i++) {
			if(getCellContent(next[i]) === CELL_OBSTACLE)
				continue;
			
			if(getCellContent(next[i]) === CELL_PLAYER)
				if(getLeekOnCell(next[i]) === getLeek())
					continue;
				
			if(map[next[i]] === -1 || map[next[i]] > map[cell] + 1) {
				map[next[i]] = map[cell] + 1;

				if(map[next[i]] < MP)
					push(queue, next[i]);
			}
		}
	}
	
	walk = [];
	for(i = 0; i < count(map); i++)
		if(map[i] !== -1)
			push(walk, i);
	
	return walk;
}