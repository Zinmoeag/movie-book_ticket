import Seat from "./Seat"
import { useBooking } from "@/Context/BookingContext/BookingContext";
import { isEqual } from "lodash";
import { useState } from "react"
import {usePage} from "@inertiajs/react";
import { Link } from "@inertiajs/react";

const SeatBtn = ({ seat , showOptionMenu, seeInfo, modalTogle}) => {
    
    const {
        props : {
            auth : {user},
        }
    } = usePage();

    const {
        setBooking,
        adminPage, 
        data,
        showBookingInfo,
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
                
                {adminPage && menuofBookBought && menuofBookBought === seat.id && (
                    <ul className="py-2 text-slate-800 absolute z-20 rounded-lg border-slate-800 border-2 bg-white w-[7rem] left-[100%] top-0">
                        <li className="px-4">
                            <button
                            type="button"
                            onClick={e => {
                                showBookingInfo(seat.id, user)
                                modalTogle()
                            }}
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