function bubble_getHealNeededAlly(@allys, n)
{
	var current;
	var currentLifePc;
	var leek;
	var lifePc;
	var dist;
	var meCell;
	var currentDist;

	dist = 613;
	lifePc = 100;
	meCell = getCell();
	while (n--)
	{
		current = allys[n];
		currentLifePc = getLife(current) / getTotalLife(current) * 100;
		currentDist = getDistance(getCell(current), meCell);
		if (isSummon(current));
		else if (currentLifePc >= lifePc);
		else if ((currentLifePc == lifePc) && (currentDist > dist));
		else
		{
			lifePc = currentLifePc;
			leek = current;
			dist = currentDist;
		}
	}
	return leek;
}

function bubble_goHealAlly(@allys, n, chip)
{
	var leek;

	leek = bubble_getHealNeededAlly(allys, n);
	if (leek)
	{
		debug("soin de " + getName(leek));
		if (getDistance(getCell(), getCell(leek)) > 3)
		{
			moveToward(leek);
		}
		else moveAwayFrom(leek, 2);
		useChip(chip, leek);
	}
}

function bubble_main()
{
 	var chips = getChips();
	var chip;
	var n;
	var enemy;
	var ally;
	var allys = [];

	allys = getAliveAllies();
	enemy = getNearestEnemy();
	n = count(chips);
	while (n--)
	{
		chip = chips[n];
		if (chip == CHIP_BANDAGE) 
		{
			bubble_goHealAlly(allys, count(allys), chip);
		}
		else if (chip == CHIP_HELMET) useChip(chip, ally);
		else if (chip == CHIP_PEBBLE) useChip(chip, enemy);
		else if (chip == CHIP_PROTEIN) useChip(chip, ally);
	}
	say("Bananaaaa !");
	moveToward(ally);
}
