include("ft_cell");
include("ft_array");

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
	var myMoves = [];
	var enemiesMoves = [];
	var dangerZone = [];
	var paths = [];

	myMoves = ft_cell_getLeeksMoves([ getLeek() ], acm, ignore);
	enemiesMoves = ft_cell_getLeeksMoves(getAliveEnemies(), acm, ignore);
	ignore = [];
	dangerZone = ft_cell_getDangerous_cells(acm, ignore);
	paths = ft_cell_getEnemiesPaths();

	mark(myMoves, COLOR_GREEN);
	mark(dangerZone, COLOR_RED);
	mark(paths, getColor(200, 15, 200));
	mark(enemiesMoves, getColor(205, 102, 0));
}
