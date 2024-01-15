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

    const [bookingInfo, setBookingInfo] = useState(null);

    const { 
    data, 
    setData, 
    post, 
    processing,
    reset,
    errors } = useForm(initialData);

    const [liveData, setLiveData] = useState([]);
    const [bookingUsers, setBookingUser] = useState(null);

    //controlls
    const [btnOptionMenu, setBtnOptionMenu] = useState(false);

    const initialLizeBookingUser = (users) => {
      setBookingUser(users);
    }

    const updateBookingUsers = (newUser) => {

        setBookingUser(prev => {
            return [
                ...prev,
                newUser,
            ]
        })
    }

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
                alert("booking Success")
            },
        });
    }

    const bookingApprove = () => {
        
    }

    const showBookingInfo = (id, user) => {

        if(user){
           let bookingInfo = bookingUsers.filter(user => {

                let isture = false;
                user.seats.forEach(s => {
                    if(s.id === id){
                        isture = true;
                    }
                });
                return isture;
            })[0];


            setBookingInfo(bookingInfo);
        }else{
            setBookingInfo(null)
        }

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
        setLiveBookingData,
        initialLizeBookingUser,
        updateBookingUsers,
        bookingInfo,
        showBookingInfo,
        btnOptionMenu, 
        setBtnOptionMenu
    }
}

export default useBookingState;