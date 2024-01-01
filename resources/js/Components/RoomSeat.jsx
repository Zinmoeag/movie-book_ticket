import SeatLayoutGenerator from "@/Utilities/seatLayoutGenerator";
import { useBooking } from "@/Context/BookingContext/BookingContext";
import { useSeat } from '@/Context/SeatContext/SeatContext';
import SeatZone from "./SeatZone";
import { useEffect } from "react";


const RoomSeat = ({ seats, room, schedule }) => {

    const {
        useSeatState,
    } = useSeat();

    const {
        seatsObj,
        updateSeat,
        filterByTypeAndRow
    } = useSeatState(seats)


    const {
        setLiveBookingData,
    } = useBooking();


    const sd = filterByTypeAndRow(seats);



    let roomLayout = SeatLayoutGenerator(room.room_type);

    const channel = window.Echo.channel(`booking.${schedule}`);

    useEffect(() => {
        channel.listen('.book', function(data) {
            updateSeat(data.seat)
        });
    }, [channel])

    return (
        <>
            <div className="flex flex-col items-center gap-4">
                {Object.entries(filterByTypeAndRow(seatsObj.seats)).map(([key, value]) => (
                    //normal || couple
                    <div className="flex flex-col items-center gap-4">

                        {Object.entries(value).map(([row, seats], i) => {
                            //row of each type
                            return (
                            <ul className='flex' key={row}>
                                <span  className='px-4 text-green-400'>{row}</span>
                                <li>
                                    <SeatZone
                                        rowLayout = {roomLayout[key]?.layout[i] || []}
                                        seatRow = {seats}
                                    />
                                </li>
                                <span  className='px-4 text-green-400'>{row}</span>
                            </ul>
                        )})}
                    </div>
                ))}
            </div>
        </>
    )
}

export default RoomSeat;