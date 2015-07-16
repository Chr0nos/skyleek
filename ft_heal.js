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

