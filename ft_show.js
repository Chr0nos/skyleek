include("ft_cell");
include("ft_array");

function ft_show_LeekMoves(leeks, color, @acm)
{
	var cells = [];
	var ignore = [];

	for (var leek in leeks)
	{
		ft_cell_getReachableCells(getCell(leek), getMP(leek), cells, acm, ignore);
	}
	mark(cells, color);
}

/**
colore en rouge les cases ou les enemies peuvent faire feu
@param acm AdjacetsCellsMap pré-calculée
@return rien
*/
function ft_show_dangerous_cells(acm)
{
	var cells = [];
	var ignore = [];
	var range;

	for (var enemy in getAliveEnemies())
	{
		range = getMP(enemy) + getWeaponMaxScope(getWeapon(enemy));
		ft_cell_getReachableCells(getCell(enemy), range, acm, cells, ignore);
	}
	mark(cells, COLOR_RED);
}

function ft_show_colors(@enemy, @acm)
{
	ft_show_LeekMoves([getLeek()], COLOR_GREEN, acm);
	ft_show_dangerous_cells(acm);
	ft_show_LeekMoves(getAliveEnemies(), getColor(255, 184, 0), acm);
}
