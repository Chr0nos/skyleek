include("ft_cell");
include("ft_array");

function ft_show_LeekMoves(leek, color, @acm)
{
	var cells = [];

	ft_cell_getReachableCells(getCell(leek), getMP(leek), cells, acm, []);
	ft_array_unique(cells);
	mark(cells, color);
}

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
	ft_show_LeekMoves(getLeek(), COLOR_GREEN, acm);
	ft_show_dangerous_cells(acm);
	ft_show_LeekMoves(enemy, getColor(255, 184, 0), acm);
}
