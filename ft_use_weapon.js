include("ft_weapon");
include("ft_move");
include("ft_array");

function ft_use_weapon_get_enabled_weapons()
{
	/*
	** this function describe all current enabled weapons for my leek
	** i prefere it instead of getWeapons because it cost less operations
	** and i can choose the weapons priority order
	*/
	var weapons = [];

	push(weapons, WEAPON_GRENADE_LAUNCHER);
	push(weapons, WEAPON_LASER);
	push(weapons, WEAPON_MAGNUM);
	//ft_array_sort(weapons, count(weapons), ft_weapon_getWeaponBaseDamage, ft_array_sortGeneric);
	return weapons;
}

function ft_weapon_can_hurt_ally(weapon)
{
	/*
	** return true if any ally is on the same line
	*/
	var ally = [];
	var n;
	var ac;
	var mc;

	if (n < 1) return false;
	if (weapon == WEAPON_LASER);
	else if (weapon == WEAPON_B_LASER);
	else return false;
	ally = getAliveAllies();
	n = count(ally);
	mc = getCell();
	while (n--)
	{
		if (isOnSameLine(getCell(ally[n]), mc)) return true;
	}
	return false;
}


function ft_weapon_get_best_usable_old(weapons, enemy)
{
	var pos;
	var n;
	
	n = count(weapons);
	pos = 0;
	while (pos < n)
	{
		if (canUseWeapon(weapons[pos], enemy))
		{
			return weapons[pos];
		}
		pos++;
	}
}


function ft_use_weapons(@enemy, @enemy_cell)
{
	/*
	** this function find the best weapon to use
	** and call ft_weapon_fire if any weapon is able to fire on enemy
	** weapons are tried in weapons[] order (from 0 to N)
	*/
	//if (true) return ft_use_weapon_old(enemy, enemy_cell);

	var weapons = [];
	var weapon;

	weapons = ft_use_weapon_get_enabled_weapons();
	ft_move_pre(weapons, enemy, enemy_cell);
	weapon = ft_weapon_get_best_usable_old(weapons, enemy);
	if (!weapon) return false;
	if (!ft_weapon_fire(weapon, enemy, 4))
	{
		debug("erreur de tir: " + getWeaponName(weapon));
	}
	return true;
}
