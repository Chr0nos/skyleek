
function ft_array_indexOf(@array, item, array_size)
{
	/*
	* This function will return the first position of "item" find in
	* array parameter. You have to fill the array size
	*/
	var i;

	i = 0;
	while (i < array_size)
	{
		if (array[i] == item) return i;
		i++;
	}
	return -1;
}

function ft_inArray(@array, item, size)
{
	/*
	* This function return true of item is
	* in "array", else it will return false. You have to fill the array size
	*/
	while (size--)
	{
		if (array[size] == item) return true;
	}
	return false;
}

function ft_arraySort(array, greaterThan)
{
	/*
	* Sort array in order of growth
	*/
	if(count(array) <= 1)
	{
		return array;
	}

	var pivot;
	var arrayLeft;
	var less  = [];
	var more  = [];
	var value;

	pivot = array[0];
	arrayLeft = count(array);

	while (arrayLeft--)
	{
		value  = array[arrayLeft];
		push(greaterThan(value, pivot) ? more : less, value);	
	}

	less = ft_arraySort(less, greaterThan);
	more = ft_arraySort(more, greaterThan);
	
	push(less, pivot);
	pushAll(less, more);
	
	return less;
}

function ft_array_unique(@array)
{
	/*
	** this method will return a new array
	** with no doubles values
	** example: array = ft_array_unique(array);
	*/
	var result = [];
	var pos;
	var n;
	var v;

	pos = 0;
	n = count(array);
	while (n--)
	{
		v = array[n];
		if (!inArray(result, v))
		{
			result[pos++] = v;
		}
	}
	return result;
}

function ft_array_sortByLifeSorter(@array, @pivot, @leek, @result)
{
	/*
	** this is an intenal function: do not use directly
	** this function is called by ft_array_sortByLife
	** 
	*/
	var leekLife;

	leekLife = getLife(leek);
	if (leekLife > pivot)
	{
		push(result, leek);
	}
	else
	{
		insert(result, leek, 0);
		pivot = result[0];
	}
}

function ft_array_sortByLife(@array, size)
{
	/*
	** this function sort the array who
	** contains leeks id in the order of
	** the weeker to the stronger
	** in other words the first value will be
	** the weaker one
	*/
	return ft_array_sort(@array, size, getLife, ft_array_sortByLifeSorter);
}

function ft_array_sort(@array, size, pivot, sorter)
{
	/*
	** this function sort an array
	** pivot = pointer of functoin to get something about to compare
	** using "sorter" as a pointer of function
	** sorter will receive: "array, pivotValue, leek"
	** example: ft_array_sort(array, 64, getLife, ft_array_sortByLifeSorter)
	*/
	var result = [];
	var leek;
	var pivotValue;

	pivotValue = pivot(array[0]);
	while (size--)
	{
		leek = array[size];
		sorter(array, pivotValue, leek, result);
	}
	return result;
}
