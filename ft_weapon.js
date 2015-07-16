include("ft_effect_count");

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
		}
	}
	return sucess;
}

function ft_weapon_estimate_dmg(weapon, leek, shoots)
{
	/*
	** return the minimal weapon damage of weapon
	** min to reduce fail risk, dont be too optimist !
	** thanks to murphy's law
	** note: actualy it dont take care about poison/burn effect
	** mode = 1 for minimal damages (local leek)
	** mode = 2 for maximal damages (enemy)
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
