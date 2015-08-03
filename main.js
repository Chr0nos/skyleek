include("ft_heal");
include("ft_chips");
include("ft_move");
include("ft_use_weapons");
include("ft_speak");
include("ft_cell");
include("ft_show");
include("ft_numbers");

global ADJACENTS_CELLS_MAP = [];
global ADJACENTS_CELLS_JOB = [];

function main()
{
	var enemy = getNearestEnemy();
	var enemy_cell = getCell(enemy);
	var turn = getTurn();

	if (turn == 1)
	{
		setWeapon(WEAPON_MAGNUM);
		ADJACENTS_CELLS_JOB = [ 18 , 17, -18, -17 ];
		ADJACENTS_CELLS_MAP = ft_cell_getAllAdjacentsCells();
	}
	ft_show_colors(ADJACENTS_CELLS_MAP);
	if ((turn % 3) == 0) useChip(CHIP_STEROID, getLeek());
	ft_heal();
	ft_speak(turn, enemy);
	ft_use_weapons(enemy, enemy_cell);
	ft_chips(enemy);
	ft_move_post(enemy);
	if (getTP())
	{
		ft_heal_real(getLeek());
	}
	ft_speak_post(turn, enemy);
	debug("User operations: " + ft_wsize(getOperations()));
}

main();
