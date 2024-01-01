const useSeat = () => {

	const groupBy = (xs, key) => {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };

	const filterByTypeAndRow = (seats) => {
	    const filteredObj = {};

	    const seatArray = Object.entries(groupBy(seats, 'seat_type'))

	    seatArray.forEach(([key,value]) => {
	        filteredObj[key] = groupBy(value,'row');
	    })
	                

	    return filteredObj;
	}

	return {
		filterByTypeAndRow,
	}

}

export default useSeat;