import { forEach } from "lodash";
import { useState } from "react"


const useBookingState = (seats) => {

  const [seatsObj, setSeatsObj ] = useState({
        avaliable_seat : "",
        seats : seats,
  });


    const updateSeat = (seats) => {

        const existingSeatsObj = seats.reduce((acc, seat) => {
            acc[seat.id] = seat;
            return acc;
        }, {});

        const updatedSeats = seatsObj.seats.map(seat => existingSeatsObj[seat.id] || seat)

        setSeatsObj(prev => {
            return {
                ...prev,
                seats : updatedSeats,
            }
        })
  }

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
    seatsObj,
    updateSeat,
    filterByTypeAndRow,
  }
}

export default useBookingState;