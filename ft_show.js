include("ft_cell");
include("ft_array");

/**
affiche les mouvements possibles des leeks passés en parametres
@level 21
@ops variables
@param leeks array des leeks à afficher
@param color code couleur à utiliser
@param acm AdjacentsCellsMap pré-calculée array[cells][]
@return null
*/
function ft_show_LeekMoves(leeks, color, @acm)
{
	var cells = [];
	var ignore = [];

	for (var leek in leeks)
	{
		ft_cell_getReachableCells(getCell(leek), getMP(leek), cells, acm, ignore);
	}
	mark(cells, color);
}

/**
colore en rouge les cases ou les enemies peuvent faire feu
et en violet les chemin que prendrons probablement les enemis
pour arriver jusqu'a nous
@level 21
@ops variables
@param acm AdjacetsCellsMap pré-calculée
@return null
*/
function ft_show_dangerous_cells(acm)
{
	var cells = [];
	var ignore = [];
	var path = [];
	var range;

	for (var enemy in getAliveEnemies())
	{
		range = getMP(enemy) + getWeaponMaxScope(getWeapon(enemy));
		ft_cell_getReachableCells(getCell(enemy), range, acm, cells, ignore);
		pushAll(path, getPath(getCell(enemy), getCell()));
	}
	mark(cells, COLOR_RED);
	ft_array_unique(path);
	mark(path, getColor(255, 0, 255));
}

/**
fonction d'entrée pour les affichages des couleurs
@level 21
@ops variables
@param acm AdjacetsCellsMap pré-calculée
@return null
*/
function ft_show_colors(@acm)
{
	ft_show_LeekMoves([getLeek()], COLOR_GREEN, acm);
	ft_show_dangerous_cells(acm);
	ft_show_LeekMoves(getAliveEnemies(), getColor(255, 184, 0), acm);
}
