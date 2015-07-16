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
