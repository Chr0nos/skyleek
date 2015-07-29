include("ft_cell");
include("ft_array");

function ft_show_LeekMoves(leek, color)
{
    var cells = [];

    ft_cell_getReachableCells(getCell(leek), getMP(leek), cells);
    ft_array_unique(cells);
    mark(cells, color);
}

function ft_show_dangerous_cells()
{
    var cells = [];
    var enemies = [];
    var n;

    enemies = getAliveEnemies();
    n = count(enemies);
    while (n--)
    {
	pushAll(cells, ft_cell_getShootAera(enemies[n]));
    }
    ft_array_unique(cells);
    mark(cells, COLOR_RED);
}

function ft_show_colors(@enemy)
{
    ft_show_LeekMoves(getLeek(), COLOR_GREEN);
    //ft_show_dangerous_cells();
    ft_show_LeekMoves(enemy, getColor(255, 184, 0));
}
