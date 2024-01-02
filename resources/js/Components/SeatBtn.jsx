import Seat from "./Seat"
import { useBooking } from "@/Context/BookingContext/BookingContext";
import { isEqual } from "lodash";
import { useState } from "react"
import {usePage} from "@inertiajs/react";
import { Link } from "@inertiajs/react";

const SeatBtn = ({ seat , showOptionMenu, seeInfo}) => {
    
    const {
        props : {
            auth : {user},
            adminBooking,
        }
    } = usePage();

    const {
        setBooking, 
        data,
    } = useBooking();


    const [menuofBookBought, setMenuOfBookBought] = useState(null) 

    const seatButtonHanlde = (e) => {
        if(seat.status === 'avaliable'){
            setBooking(seat)
        }else if(seat.status === 'booked' || seat.status === 'bought'){

            if(user){
                setMenuOfBookBought(seat.id)
                if(menuofBookBought === seat.id){
                    setMenuOfBookBought(null)
                }
            }
            
        }
    }  


    return (
        <>
            <div className=" relative text-sm">
                <button
                data_seat_id={seat?.id}
                className=""
                onClick={seatButtonHanlde}>
                {data?.seat.some(prevSeat => isEqual(prevSeat, seat)) ? (
                    <Seat
                    selected
                    seat={seat}
                    />
                ) : (
                    <Seat
                    seat={seat}
                    />
                )}
                </button>
                
                {user && menuofBookBought && menuofBookBought === seat.id && (
                    <ul className="text-slate-800 absolute z-20 rounded-lg border-slate-800 border-2 bg-white w-[7rem] left-[100%] top-0">
                        <li className="px-4">
                            <button
                            type="button"
                            onClick={e => adminBooking.seeBookingInfo(seat.id)}
                            >
                                See Info
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
} 

export default SeatBtn