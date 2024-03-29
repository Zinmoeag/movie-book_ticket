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
                        <ul className="group flex gap-2">
                            {[...Array(value).keys()].map((seat,i) => {
                                IndexOfSeat++;
                                return (
                                    <div key={seat.id}>
                                        <SeatBtn
                                        modalTogle={modalTogle}
                                        key={seat.id}
                                        selected
                                        seat = {Object.values(seatRow)[IndexOfSeat]}
                                        />
                                    </div>
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