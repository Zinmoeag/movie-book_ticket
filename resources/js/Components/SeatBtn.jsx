import Seat from "./Seat"
import { useBooking } from "@/Context/BookingContext/BookingContext";
import { isEqual } from "lodash";
import { useState } from "react";

const SeatBtn = ({selected, seat}) => {

    
    const {setBooking, data} = useBooking();

    const [menuofBookBought, setMenuOfBookBought] = useState(null) 

    const seatButtonHanlde = (e) => {
        if(seat.status === 'avaliable'){
            setBooking(seat)
        }else if(seat.status === 'booked' || seat.status === 'bought'){
            setMenuOfBookBought(seat.id)
            if(menuofBookBought === seat.id){
                setMenuOfBookBought(null)
            }
        }
    }  


    return (
        <>
            <div className=" relative">
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
                
                {menuofBookBought && menuofBookBought === seat.id && (
                    <ul className="absolute z-20 rounded-lg border-slate-800 border-2 bg-white w-[7rem] left-[100%] top-0">
                        <li className="px-4">
                            <button className="text-slate-800">
                                edit
                            </button>
                        </li>

                        <li className="px-4">
                            <button className="text-slate-800">
                                edit
                            </button>
                        </li>

                        <li className="px-4">
                            <button className="text-slate-800">
                                edit
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </>
    )
} 

export default SeatBtn