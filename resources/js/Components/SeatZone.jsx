import Seat from "./Seat";
import { usePage } from "@inertiajs/react";
import SeatBtn from "./SeatBtn";
import DropMenuArea from '@/Components/DropMenuArea';


const SeatZone = ({seatRow, rowLayout, modalTogle}) => {

    let IndexOfSeat = -1;

    return (
        <>
            <div className="seat_area flex gap-12">
                {rowLayout.map((value,i) => {

                    return (
                        <ul className="group flex gap-2" key={i}>
                            {[...Array(value).keys()].map((seat,i) => {

                                IndexOfSeat++;
                                return (
                                    <SeatBtn
                                    modalTogle={modalTogle}
                                    key={seat.id}
                                    selected
                                    seat = {seatRow[IndexOfSeat]}
                                    />
                                )
                            
                                
                            })}
                        </ul>
                    )
                })}
            </div>
        </>
    )
}


export default SeatZone;