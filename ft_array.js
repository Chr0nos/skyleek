function ft_array_indexOf(@array, item, array_size)
{
	/*
	* this function will return the first position of "item" find in
	* array parameter. you have to fill the array size
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
	* this function will return the first position of "item" find in
	* array parameter
	*/
	return ft_array_indexOf(array, item, count(array));
}

function ft_inArray(@array, item, size)
{
	/*
	* this function return true of item is
	* in "array", else it will return false
	*/
	while (size--)
	{
		if (array[size] == item) return true;
	}
	return false;
}

function ft_inArray(@array, item)
{
	return ft_inArray(array, item, count(array));
}

