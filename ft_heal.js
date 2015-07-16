include("ft_effect_count");

function ft_heal_estimate(leek, chip)
{
	var heal;
	var n;
	
	heal = ft_effect_count(chip, EFFECT_HEAL, 1);
	if (!heal)
	{
		debug("warning: heal estimate asked for an invalid chip: " + chip);
		return 0;
	}
	return heal * (1 + getWisdom() / 100);
}

function ft_heal_getHealingChips()
{
	/*
	** return an array of all healing equiped
	** chips
	*/
	var equiped_chips = [];
	var healing_chips = [];
	var cchip;
	var n;

	equiped_chips = getChips();
	n = count(equiped_chips);
	while (n--)
	{
		cchip = equiped_chips[n];
		if (ft_effect_count(cchip, EFFECT_HEAL, 2))
		{
			push(healing_chips, cchip);
		}
	}
	return healing_chips;
}
