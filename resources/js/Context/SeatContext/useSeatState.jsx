import { forEach, get } from "lodash";
import { useState } from "react"


const useBookingState = () => {

  const [seatsObj, setSeatsObj ] = useState({
        avaliable_seat : "",
        seats : {}, 
  });

  // console.log(seatsObj?.seats)

  const [newSeats, setNewSeats] = useState([]) 


  const initialLizeSeats = (seats) => {

      setSeatsObj(prev => {
        return {
          ...prev,
          seats : seats
        }}
      )
  }

  const getAddedBookedSeats = (obj,seats) => {

    seats.forEach(seat => {
      let typeVar = obj[seat.seat_type] || null;
      let rowVar  = typeVar ? typeVar[seat.row].seats : null;
      let idVar = rowVar ? rowVar[seat.id] : null ;
      
      if(typeVar && rowVar && idVar){
        return obj[seat.seat_type][seat.row].seats[seat.id] = seat;
      }
    })

    return obj;
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
      // let modifiedData = getAddedBookedSeats(obj, newSeats)

        setSeatsObj(prev => {
            return {
                ...prev,
                seats :getAddedBookedSeats(prev.seats, newSeats),
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