include("ft_cell");
include("ft_array");

/**
affiche les mouvements possibles des leeks passés en parametres
@level 21
@ops variables
@param leeks array des leeks à afficher
@param color code couleur à utiliser
@param acm AdjacentsCellsMap pré-calculée array[cells][]
@param ignore liste des cells à ignorer, [] par defaut
@return null
*/
function ft_show_LeekMoves(leeks, color, @acm, @ignore)
{
	var cells = [];

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
@param ignore liste des cells à ignorer (par default [])
@return null
*/
function ft_show_dangerous_cells(@acm, @ignore)
{
	var cells = [];
	var path = [];
	var range;

	for (var enemy in getAliveEnemies())
	{
		range = getMP(enemy) + getWeaponMaxScope(getWeapon(enemy));
		ft_cell_getReachableCells(getCell(enemy), range, cells, acm, ignore);
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
	var ignore = [];

	ft_show_LeekMoves([getLeek()], COLOR_GREEN, acm, ignore);
	ft_show_dangerous_cells(acm, ignore);
	ft_show_LeekMoves(getAliveEnemies(), getColor(255, 184, 0), acm, ignore);
}
