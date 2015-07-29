function ft_debug_operations(@func)
{
	var ops;
	
	ops = getOperations();
	func();
	debug("operation consumed: " + (getOperations() - ops));
}

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

function ft_array_unique_old(@array)
{
	/*
	** this method will return a new array
	** with no doubles values
	** example: array = ft_array_unique_old(array);
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

function ft_array_countElement(@array, n, @element)
{
	/*
	** return the number of "element" in given array
	** n = the size of the array
	*/
	var count;
	var value;

	count = 0;
	while (n--)
	{
		value = array[n];
		if (value == element) count++;
	}
	return count;
}

function ft_array_unique(@array)
{
	/*
	** this function remove all doubles from the
	** given array, it dont make a new one,
	** for new array see ft_array_unique_old
	*/
	var n;
	var value;
	var size;

	size = count(array);
	n = size;
	while (n--)
	{
		value = array[n];
		if (ft_array_countElement(array, size, value) > 1)
		{
			remove(array, n);
			size--;
			n++;
		}
	}
	return array;
}

function ft_array_sortGeneric(@array, @pivot, @item, @result, subPivot)
{
	/*
	** this is the generic array sorter
	** it will call pivot(item) on each iteration
	** to don't use a pivot use the sorter ft_array_sorterRawValue
	** do not use it directly, pass it as an argument to
	** "ft_array_sort"
	*/
	var value;

	value = subPivot(item);
	if (value >= pivot)
	{
		push(result, item);
	}
	else
	{
		insert(result, item, 0);
		pivot = result[0];
	}
}

function ft_array_sorterRawValue(@array, @pivot, @value, @result, subPivot)
{
	/*
	** this sorter is used by ft_array_sort
	** it sort raw values (int)
	** the subPivot variable is not used in this code
	** it's just here for compatibilty
	*/
	if (value >= pivot)
	{
		push(result, value);
	}
	else
	{
		insert(result, value, 0);
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
	return ft_array_sort(@array, size, getLife, ft_array_sortGeneric);
}

function ft_array_sortByChipCost(@array, size)
{
	/*
	** sort array of chips by the less cost to the more expanssive cost
	*/
	return ft_array_sort(@array, size, getChipCost, ft_array_sortGeneric);
}

function ft_array_sort(@array, size, pivot, sorter)
{
	/*
	** this function sort an array
	** pivot = pointer of functoin to get something about to compare
	**       -> in the loop pivot will change into array[0]
	** subPivot = same a pivot but called on each item in the list to sort
	** using "sorter" as a pointer of function
	** sorter will receive: "array, pivotValue, leek"
	** example: ft_array_sort(array, count(array), getLife, ft_array_sortGeneric)
	** the Generic sorter call the "pivot" function on each item in the array
	** like: pivot(item) (just this argument)
	*/
	var result = [];
	var item;
	var pivotValue;
	var subPivot;

	subPivot = pivot;
	pivotValue = pivot(array[0]);
	while (size--)
	{
		item = array[size];
		sorter(array, pivotValue, item, result, subPivot);
	}
	return result;
}

function ft_array_pushAllUniques(@array, @elements)
{
	var n;
	var element;

	n = count(elements);
	while (n--)
	{
		element = elements[n];
		if (!inArray(array, element))
		{
			push(array, element);
		}
	}
}
