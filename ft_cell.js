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

	if 		(cell = getCellFromXY(x - 1, y    )) push(adj, cell);
	else if (cell = getCellFromXY(x + 1, y    )) push(adj, cell);
	else if (cell = getCellFromXY(x    , y - 1)) push(adj, cell);
	else if (cell = getCellFromXY(x    , y + 1)) push(adj, cell);
	
	return adj;
}