import { useState } from "react"
import { divide, initial, isEqual } from "lodash"
import { router, useForm } from '@inertiajs/react'
import { useDropMenu } from "../DropMenu/DropMenu";
import Ticket from "@/Components/Ticket";


const useBookingState = () => {

    const initialData = {
        name : "",
        email : "",
        phone : "",
        seat : [],
    };

    const initialLiveData = [];


    const [liveData, setLiveData] = useState(initialLiveData);

    const { 
    data, 
    setData, 
    post, 
    processing,
    reset,
    errors } = useForm(initialData);

    const setLiveBookingData = (key, seats) => {
      setLiveData([
        ...liveData,
        ...seats,
      ])
    }

    const setBooking = (seat) => {

        const isSeatAlreadyBooked = data.seat.some(prevSeat => isEqual(prevSeat, seat));

        if(!isSeatAlreadyBooked){
            setData('seat', [
                ...data.seat,
                seat,
            ])
        }else{
            removeSeat(seat);
        }
    };

    const removeSeat = (seat) => {

            // Use filter to create a new array excluding the item with the specified ID
            const updatedSeats = data.seat.filter(existedSeat => existedSeat.id !== seat.id);

            setData('seat', updatedSeats);
    }

    const submitBooking = (schedule) => {
        const uri = `/book/${schedule}`;

        post(uri, {
            preserveScroll: true,
            onSuccess: page => {
                //reset Data
                reset();

                // showWithChild(<div>success</div>);
            },
        });
    }

    const buy = (schedule) => {
        const uri = `/buy/${schedule}`;

        post(uri, {
            preserveScroll: true,
            onSuccess: page => {
                //reset Data
                reset();
                // showWithChild(<div>success</div>);
            },
        });
    }

    return {
        data,
        setData,
        errors, 
        setBooking,
        removeSeat,
        submitBooking,
        buy,
        liveData,
        setLiveBookingData
    }
}

export default useBookingState;