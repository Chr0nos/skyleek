include("ft_effect_count");

function ft_chips_getChipByEffect(effect)
{
	/*
	** return an array of all equiped
	** chips that have the "effect"
	** example: ft_chips_getChipByEffect(EFFECT_HEAL)
	** will return all healing chips equiped on the leek
	*/
	var equiped_chips = [];
	var effect_chips = [];
	var cchip;
	var n;

	equiped_chips = getChips();
	n = count(equiped_chips);
	while (n--)
	{
		cchip = equiped_chips[n];
		if (ft_effect_count(cchip, effect, 2))
		{
			push(effect_chips, cchip);
		}
	}
	return effect_chips;
}
