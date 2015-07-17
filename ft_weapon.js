include("ft_effect_count");
include("ft_array");

function ft_weapon_estimate_dmg(weapon, leek, shoots)
{
	/*
	* Return the minimal weapon damage of weapon
	* min to reduce fail risk, dont be too optimist !
	* thanks to murphy's law
	* note: actualy it dont take care about poison/burn effect
	* mode = 1 for minimal damages (local leek)
	* mode = 2 for maximal damages (enemy)
	*/
	var coef;
	var dmg;
	var tp;
	var shootsAvailables;
	var mode;

	if (leek == getLeek()) mode = 1;
	else mode = 2;
	tp = getTP(leek);
	shootsAvailables = floor(tp / getWeaponCost(weapon));
	if (shoots > shootsAvailables) shoots = shootsAvailables;
	coef = 1;
	dmg = ft_effect_count(weapon, EFFECT_DAMAGE, mode);
	dmg *= (1 + getStrength() / 100) * (1 - getRelativeShield(leek) / 100) * coef;
	dmg *= shoots;
	dmg -= getAbsoluteShield(leek);
	return dmg;	
}

function ft_can_use_weapon(weapon, leek, cell)
{
    /*
    * Return true if leek can use weapon on cell (else return false)
    */
    var lCell;
    var dist;
 
    lCell = getCell(leek);
    dist = getCellDistance(lCell, cell);
    if (dist > getWeaponMaxScope(weapon)) return false;
    else if (dist < getWeaponMinScope(weapon)) return false;
    else if (getWeaponCost(weapon) > getTP(leek)) return false;
    else if ((isInlineWeapon(weapon)) && (!isOnSameLine(lCell, cell))) return false;
    else if (!lineOfSight(cell, lCell)) return false;
    return true;
}

function ft_weapon_getEnemiesInRange()
{
	/*
	** this function return all shootable enemy
	** with the current weapon
	*/
	var enemies = [];
	var enemies_result = [];
	var n;
	var leek;

	enemies = getAliveEnemies();
	while (n--)
	{
		leek = enemies[n];
		if (canUseWeapon(leek))
		{
			push(enemies_result, leek);
		}
	}
	return enemies_result;
}

function ft_weapon_switchToNextEnemy(@enemy)
{
	/*
	** this function change the value of "enemy"
	** given in a pointer: by the next reachable enemy
	** ( the weaker one )
	*/
	var enemies = [];

	enemies = ft_weapon_getEnemiesInRange();
	if (!count(enemies))
	{
		return false;
	}
	enemies = ft_array_sortByLife(enemies, count(enemies));
	enemy = enemies[0];
	return true;
}

function ft_weapon_fire(weapon, enemy, shoots)
{
	/*
	** this function actualy shoot with the weapon on enemy
	** it return the number of success shoot
	*/
	var sucess;
	var weaponCost;
	var tp;

	if (weapon != getWeapon())
	{
		setWeapon(weapon);
	}
	sucess = 0;
	tp = getTP();
	weaponCost = getWeaponCost(weapon);
	while ((shoots--) && (tp -= weaponCost > weaponCost))
	{
		if (useWeapon(enemy) == USE_SUCCESS)
		{
			sucess++;
			if (!isAlive(enemy))
			{
				ft_weapon_switchToNextEnemy(enemy);
			}
		}

	}
	return sucess;
}
