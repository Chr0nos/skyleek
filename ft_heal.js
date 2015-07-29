include("ft_effect_count");
include("ft_chips");

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

function ft_heal_real(leek)
{
	var heals = [];
	var pos;
	var tp;
	var hc;

	tp = getTP();
	pos = 0;
	push(heals, CHIP_WARM_UP);
	push(heals, CHIP_ARMOR);
	pushAll(heals, ft_chips_getChipByEffect(EFFECT_HEAL));
	hc = count(heals);
	while ((pos < hc) && (tp))
	{
		if (canUseChip(heals[pos], leek))
		{
			useChip(heals[pos], leek);
			tp -= getChipCost(heals[pos]);
		}
		pos++;
	}
}

function ft_heal()
{
	var me;
	var life;

	life = getLife();
	me = getLeek();
	if (life / getTotalLife() * 100 <= 55)
	{
		ft_heal_real(me);
		return true;
	}
	return false;
}
