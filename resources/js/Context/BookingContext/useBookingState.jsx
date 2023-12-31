import { useState } from "react"
import { divide, isEqual } from "lodash"
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

    // const {
    //     showWithChild
    // } = useDropMenu();

    const { 
        data, 
        setData, 
        post, 
        processing,
        reset,
        errors } = useForm(initialData)

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
        buy 
    }
}

export default useBookingState;