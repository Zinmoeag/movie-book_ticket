import { forEach } from "lodash";
import { useState } from "react"


const useBookingState = () => {

  const [seatsObj, setSeatsObj ] = useState({
        avaliable_seat : "",
        seats : [], 
  });

  const [newSeats, setNewSeats] = useState([]) 



  const initialLizeSeats = (seats) => {

      setSeatsObj(prev => {
        return {
          ...prev,
          seats : seats
        }}
      )
  }


  const mergeLiveSeats  = (seats) => {
    const newLiveSeats = [
      ...newSeats,
      ...seats
    ]
    
    setNewSeats(newLiveSeats);

    return newLiveSeats;
  }

    const updateSeat = (newSeats) => {

        const existingSeatsObj = newSeats.reduce((acc, seat) => {
          acc[seat.id] = seat;
          return acc;
        }, {});
        
        
        setSeatsObj(prev => {
          const updatedSeats = prev.seats.map(seat => existingSeatsObj[seat.id] || seat)

          
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
    initialLizeSeats, 
  }
}

export default useBookingState;