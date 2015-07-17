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

function ft_array_indexOf(@array, item)
{
	/*
	* This function will return the first position of "item" find in
	* array parameter
	*/
	return ft_array_indexOf(array, item, count(array));
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

function ft_inArray(@array, item)
{
	/*
	* This function return true of item is
	* in "array", else it will return false
	*/
	return ft_inArray(array, item, count(array));
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

	pivot = array[0];
	arrayLeft = count(array);

	while(arrayLeft--)
	{
		push(greaterThan(array[i], pivot) ? more : less, array[i]);	
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
