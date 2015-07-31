/**
permet de récuperer un effet en particulier sur un item générique
@level 15
@ops variables
@param item objet à tester (chip, arme ou leekId)
@param effet effet à rechercher (ex: EFFECT_DAMAGES)
@param value sous valeur à tester: 1 = pire des cas, 2 meilleur des cas, 3 arbre binaire
@return -1 = item inconnu, -2 = item null, >= : la valeur de retour
*/

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
	* 	-1 : error : unknow item requested)
	*  	-2 : error : empty "item" (null)
	*  >= 0 : the requested value
	*/
	var effects = [];
	var n;
	var effect_value;

	effect_value = 0;
	if (!item) return -2;
	else if (isWeapon(item)) effects = getWeaponEffects(item);
	else if (isChip(item)) effects = getChipEffects(item);
	else if (getLevel() >= 61) effects = getEffects(item);
	else
	{
		debug("error: unknow item for ft_effect_count: " + item);
		return -1;
	}
	n = count(effects);
	while (n--)
	{
		if (effects[n][0] == effect)
		{
			effect_value += effects[n][value];
		}
	}
	return effect_value;
}
