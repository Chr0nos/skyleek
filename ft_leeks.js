include('ft_array');

var leeksOrder = [];

function ft_compareOrder(leekA, leekB)
{
	/*
	** Compare order of two leeks and return the first of two
	*/
	if (getFrequency(leekA) === getFrequency(leekB)) return leekA < leekB;
	else return getFrequency(leekA) > getFrequency(leekB);
}

function ft_leeksInit(@leeksOrder)
{
	/*
	** Initialize the leekOrder array
	*/
	var allies  = ft_arraySort(getAllies(),  ft_compareOrder);
	var enemies = ft_arraySort(getEnemies(), ft_compareOrder);
	var team;
	
	team = ft_compareOrder(allies[count(allies) - 1], enemies[count(enemies) - 1]);
	
	while (!isEmpty(allies) || !isEmpty(enemies)) 
	{
		if (!isEmpty(team ? allies : enemies))
		{
			push(ft_getOrder, pop(team ? allies : enemies));
		}
		team = !team;
	}
	return leeksOrder;
}

function ft_getOrder(@leeksOrder)
{
	/*
	** Return the order of leeks
	*/
	if (isEmpty(leeksOrder))
	{
		ft_leeksInit(leeksOrder);
	}
	return leeksOrder;
}

function ft_getNextTurn()
{
	/*
	** Return an array
	** in the order of next to farest
	*/
	var leeks;

	leeks = ft_getOrder(leeks);
	while(leeks[0] !== getLeek()) 
	{
		push(leeks, shift(leeks));
	}
	return leeks;
}

function ft_getLifePc(leek)
{
	return getLife(leek) / getTotalLife(leek) * 100;
}

/**
renvoi l'enemi le plus proche de cell
@param cell la cellule d'ou commenter le test
@return leekId du leek le plus proche
*/
function ft_getNearestTo(cell, func)
{
	var distance;
	var newDistance;
	var leek;

	distance = 612;
	for (var enemy in func())
	{
		newDistance = getDistance(cell, getCell(enemy));
		if (newDistance < distance)
		{
			distance = newDistance;
			leek = enemy;
		}
	}
	return leek;
}

