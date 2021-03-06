include("ft_weapon");
include("ft_array");
include("ft_leeks");

function ft_move_is_walkable(cell)
{
	var leeks = [];
	
	pushAll(leeks, getAliveAllies());
	pushAll(leeks, getAliveEnemies());
	pushAll(leeks, getObstacles());
	if (inArray(leeks, cell)) return false;
	return true;
}

function ft_move_to_weapon_line(weapon, enemy)
{
	/*
	** this function move the leek to the nearest linear cell
	** to be able to shoot with "weapon" (for linear weapons)
	** this function MUST be called by ft_move_pre
	** DONT USE IT IN OTHER CASE (or prepare for a crap AI)
	*/
	var meCell;
	var cell;
	var cells = [];
	var n;
	var distance;
	var bestCell;
	var bestCellDistance;

	pushAll(cells, getCellsToUseWeapon(weapon, enemy));
	n = count(cells);
	meCell = getCell();
	bestCellDistance = 9999;
	bestCell = -1;
	while (n--)
	{
		cell = cells[n];
		distance = getDistance(meCell, cell);
		if (distance < bestCellDistance)
		{
			bestCellDistance = distance;
			bestCell = cell;
		}
	}
	if (bestCell >= 0) moveTowardCell(bestCell);
}

function ft_move_pre(weapons, enemy, enemy_cell)
{
	/*
	** this function set the leek in the best position
	** if life is too low the leek will try to run away
	** else he will follow the enemy
	** note: all "run away" are marked as a simple "return" here
	** in fact the runAwayFrom(leek) is performed in ft_move_post
	** to let my leek use his weapon
	** it's IMPORTANT that this function do not get too close
	** to the enemy
	*/
	var distance;
	var minDistance;
	var moveCases;
	var mp;
	var weaponNum;

	mp = getMP();
	weapons = getWeapons(getLeek());
	weaponNum = count(weapons);
	ft_array_sort(weapons, weaponNum, getWeaponMaxScope, ft_array_sortGeneric);
	minDistance = weapons[weaponNum - 1];

	if (!mp) return;
	else if (getLife(enemy) <= 100) moveToward(enemy);
	else if (ft_getLifePc(getLeek()) < 40) return;
	distance = getDistance(getCell(), enemy_cell);
	if (distance > minDistance)
	{
		moveCases = distance - minDistance;
		if (moveCases > mp) moveCases = mp;
		moveToward(enemy, moveCases);
	}
	else if (distance <= 1) moveAwayFrom(enemy, 1);
	else if ((!isOnSameLine(getCell(), enemy_cell)) && (inArray(weapons, WEAPON_LASER)))
	{
		ft_move_to_weapon_line(WEAPON_LASER, enemy);
	}
}

function ft_move_post(enemy)
{
	/*
	** this function describe the movement policy after gun use
	** current policy:
	** 1: if enemy life is lower than minimum damage
	** 2: if life is below 100 : move away
	** 3: if we are on the same line of enemy and he has a linar gun:
	**    -> move to non linear
	** il all other cases: dont move
	*/
	var lifePc;
	var dmg;

	dmg = ft_weapon_estimate_next_shoots(enemy, getLeek());
	lifePc = getLife() / getTotalLife() * 100;

	if (!getMP()) return;
	else if (getLife(enemy) <= dmg) return;
	else if (lifePc < 45) moveAwayFrom(enemy);
	/*
	else if (ft_weapon_has_linear(enemy))
	{
		//move to a non linear cell ! (todo)
	}
	*/
}

