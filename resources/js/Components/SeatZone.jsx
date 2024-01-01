import Seat from "./Seat";
import { useBooking } from "@/Context/BookingContext/BookingContext";
import { isEqual } from "lodash";
import SeatBtn from "./SeatBtn";


const SeatZone = ({seatRow, rowLayout}) => {

    let IndexOfSeat = -1;

    return (
        <>
            <div className="seat_area flex gap-12">
                {rowLayout.map((value,i) => {

                    return (
                        <ul className="group flex gap-4" key={i}>
                            {[...Array(value).keys()].map((seat,i) => {

                                IndexOfSeat++;
                                return (
                                    <SeatBtn
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