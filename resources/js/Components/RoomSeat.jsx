import SeatLayoutGenerator from "@/Utilities/seatLayoutGenerator";
import { useSeat } from '@/Context/SeatContext/SeatContext';
import SeatZone from "./SeatZone";
import { useEffect, useState } from "react";
import BookingInfo from "@/Pages/Admin/Schedule/Partials/BookingInfo";
import { useBooking } from '@/Context/BookingContext/BookingContext';


import Modal from "./Modal";


const RoomSeat = ({ seats, room, schedule, authUser, book_seat, isAdminPage }) => {

    const {
        seatsObj,
        updateSeat,
        filterByTypeAndRow,
        initialLizeSeats,
    } = useSeat();

    console.log(seatsObj.seats)

    const {
        adminPage,
        initialLizeBookingUser,
        initializePage,
        updateBookingUsers,
        bookingInfo,
    } = useBooking()

    const [isModalShow, setIsModalShow] = useState(false)


    //initailize global state
    useEffect(() => {
        initialLizeSeats(seats)
        initialLizeBookingUser(book_seat)
        initializePage(authUser, isAdminPage)
    },[])

    //channel handling
    const adminChannel = window.Echo.private(`adminBooking.${schedule}`);
    const channel = window.Echo.channel(`booking.${schedule}`);

    useEffect(() => {
        channel.listen('.book', function(data) {
            updateSeat(data.seat)
        });

        adminChannel?.listen('.admin.book', function(data) {
            updateBookingUsers(data.booking)
        });

    }, [channel, adminChannel])

    const roleColorGenerator = (role) => {
        if(role === 'front'){
            return 'text-red-400'
        }else if(role === 'mid'){
            return 'text-green-600'
        }else if(role === 'back'){
            return 'text-blue-400'
        }else if(role === 'couple'){
            return 'text-yellow-400'
        }
    }


    const handleModal = () => {
        setIsModalShow(!isModalShow)
    }

    let roomLayout = SeatLayoutGenerator(room.room_type);

    return (
        
            <div className="flex flex-col items-center gap-4">
                {Object.entries(seatsObj?.seats).map(([key, value]) => (
                    //normal || couple
                    <div className="flex flex-col items-center gap-4" key={key}>

                        {Object.entries(value).map(([row, seats], i) => {
                            console.log(`normal - ${key}`, `row - ${row}`)
                            //row of each type
                            return (
                            <ul className='flex' key={row}>
                                <span className={roleColorGenerator(seats.role) + ' font-bold px-4 text-green-400'}>{row}</span>
                                <li>
                                    <SeatZone
                                        rowLayout = {roomLayout[key].layout[row]}
                                        seatRow = {seats.seats}
                                        modalTogle = {handleModal}
                                    />
                                </li>
                                <span  className={roleColorGenerator(seats.role) + ' font-bold px-4 text-green-400'}>{row}</span>
                            </ul>
                        )})}
                    </div>
                ))}

                {bookingInfo && adminPage && (
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

    )
}

export default RoomSeat;

