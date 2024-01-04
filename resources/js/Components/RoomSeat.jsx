import SeatLayoutGenerator from "@/Utilities/seatLayoutGenerator";
import { useSeat } from '@/Context/SeatContext/SeatContext';
import SeatZone from "./SeatZone";
import { useEffect, useState } from "react";
import BookingInfo from "@/Pages/Admin/Schedule/Partials/BookingInfo";
import { useBooking } from '@/Context/BookingContext/BookingContext';


import Modal from "./Modal";


const RoomSeat = ({ seats, room, schedule, authUser, book_seat }) => {

    const {
        seatsObj,
        updateSeat,
        filterByTypeAndRow,
        mergeLiveSeats,
        initialLizeSeats,
    } = useSeat();

    const {
        initialLizeBookingUser,
        updateBookingUsers,
        bookingInfo,
    } = useBooking()

    const [isModalShow, setIsModalShow] = useState(false)

    useEffect(() => {
        initialLizeSeats(seats)
        initialLizeBookingUser(book_seat)
    },[])

    const sd = filterByTypeAndRow(seats);

    let roomLayout = SeatLayoutGenerator(room.room_type);

    const channel = window.Echo.channel(`booking.${schedule}`);

    useEffect(() => {
        channel.listen('.book', function(data) {
            updateSeat(data.seat)
            updateBookingUsers(data.booking)

            console.log(data)
        });
    }, [channel])

   
    const [count, setCount] = useState(1);

    const handleModal = () => {
        setIsModalShow(!isModalShow)
    }

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
                                        modalTogle = {handleModal}
                                    />
                                </li>
                                <span  className='px-4 text-green-400'>{row}</span>
                            </ul>
                        )})}
                    </div>
                ))}

                {bookingInfo && authUser && (
                    <Modal
                    show={isModalShow}
                    togleModal={e => setIsModalShow(true)}
                    close={e => setIsModalShow(false)}
                    >
                        <BookingInfo
                            bookingInfo={bookingInfo}
                        />
                    </Modal>
                )}



            </div>
        </>
    )
}

export default RoomSeat;

