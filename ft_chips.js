include("ft_effect_count");
include("IA_Bubbel");
include("ft_array");

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

function ft_chip_is_summon(chip)
{
	var chips = [];
	
	push(chips, CHIP_PUNY_BULB);
	push(chips, CHIP_FIRE_BULB);
	push(chips, CHIP_ICED_BULB);
	return ft_inArray(chips, chip, count(chips));
}

function ft_chip_summon(chip)
{
	var cell;

	cell = getCell() + 1;
	while ((getCellContent(cell) != CELL_EMPTY) && (cell < 613))
	{
		cell++;
	}
	summon(CHIP_PUNY_BULB, cell, bubble_main);
}

function ft_chips(enemy)
{
	var chips = [];
	var chip;
	var n;

	push(chips, CHIP_SPARK);
	//push(chips, CHIP_ROCK);
	push(chips, CHIP_FLAME);
	push(chips, CHIP_LIGHTNING);
	push(chips, CHIP_PUNY_BULB);
	n = count(chips);
	while (n--)
	{
		chip = chips[n];
		if (ft_chip_is_summon(chip))
		{
			ft_chip_summon(chip);
		}
		else if (canUseChip(chip, enemy))
		{
			useChip(chip, enemy);
		}
	}
}

function ft_chip_zone(chip, leek)
{
	var dcells = [];
	//todo
	return dcells;
}

function ft_chip_aera(chip, leek, cell)
{
	var cells = [];
	var ccell;
	
	ccell = 613;
	while (ccell--)
	{
		//todo
	}
}

function ft_diff(@tab1, @tab2)
{
	var result = [];
	var n;

	n = count(tab1);
	while (n--)
	{
		if (!inArray(tab2, tab1[n])) push(result, tab1[n]);
	}
	return result;
}

