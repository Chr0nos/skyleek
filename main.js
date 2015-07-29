include("ft_heal");
include("ft_chips");
include("ft_move");
include("ft_use_weapons");
include("ft_cell");
include("ft_show");

function main()
{
	var enemy = getNearestEnemy();
	var enemy_cell = getCell(enemy);
	var turn = getTurn();

	ft_show_colors(enemy);
	if (turn == 1) setWeapon(WEAPON_MAGNUM);
	if ((turn % 3) == 0) useChip(CHIP_STEROID, getLeek());
	ft_heal();
	ft_use_weapons(enemy, enemy_cell);
	ft_chips(enemy);
	ft_move_post(enemy);
	if (getTP())
	{
		ft_heal_real(getLeek());
	}
	ft_speak_post(turn, enemy);
	debug("User operations: " + getOperations());
}

main();
