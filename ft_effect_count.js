function ft_effect_count(item, effect, value)
{
	/*
	** this function count the number of effect value
	** example: ft_effect_count(WEAPON_PISTOL, EFFECT_DAMAGES, 1);
	** possible items types are: weapon, chip, leek
	** will get the number of minimal damages
	**
	** value can be:
	** "1" : minimal value
	** "2" : maximal value
	** "3" : binar tree value
	* 
	* return:
	* 	-1 : error (unknow item requested)
	*  >= 0 : the requested value
	*/
	var effects = [];
	var n;
	var c;

	c = 0;
	if (isWeapon(item)) effects = getWeaponEffects(item);
	else if (isChip(item)) effects = getChipEffects(item);
	else if (getLevel() >= 61) effects = getEffects(item);
	else {
		debug("error: unknow item for ft_effect_count: " + item);
		return -1;
	}
	n = count(effects);
	while (n--)
	{
		if (effects[n][0] == effect) c += effects[n][value];
	}
	return c;
}
