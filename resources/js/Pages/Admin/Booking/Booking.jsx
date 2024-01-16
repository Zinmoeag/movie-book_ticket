import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { Handler } from "leaflet";
import { range } from "lodash";
import useAdminBooking from "@/Context/BookingContext/useAdminBooking";
import SeatLayoutGenerator from "@/Utilities/SeatLayoutGenerator";

const Booking = ({booking, room}) => {
    const {data, setData, visit} = useForm()

    const {
        destroyBooking,
        approveBooking
    } = useAdminBooking()

    let roomLayout = SeatLayoutGenerator(booking?.schedule.room.room_type);

    const isThatSeat = (seats, seat) => {
        return seats.includes(seat)
    } 

    const bookedSeats = booking?.seats.map(seat => seat.row+seat.seat_number)
    
    const handleDelete = (e) => {
        e.preventDefault();

        destroyBooking(route('admin.booking.destroy', {booking: booking.id}))
    }

    const handleBookingApprove = (e) => {
        e.preventDefault();

        approveBooking(route('admin.booking.approve', {booking: booking.id}))
    }

    return (
        <>
        <div>
            <AdminLayout>
                <div className="text-white py-6 px-6">
                    <div>
                        <h3 className="text-yellow-400 uppercase text-xl font-bold">
                            Booking
                        </h3>
                        <p>
                            Search With Booking ID
                        </p>

                            <div className="py-2 flex"> 
                                <input 
                                type="text"
                                onChange={e => setData('booking_id', e.target.value)}
                                value = {data.booking_id}
                                placeholder="ID" 
                                className="bg-transparent border-slate-[0.02rem] border-slate-400 rounded-lg w-full"
                                />
                                <Link
                                only={['booking']}
                                href={route('admin.booking')}
                                data={{booking_id : data.booking_id}} 
                                className="px-6 py-2 bg-blue-600">
                                    Search
                                </Link>
                            </div>


                            <div>
                                {booking && (
                                    <>
                                    <div className="py-6 flex">
                                        <div>
                                            <h3 className="text-2xl text-yellow-400 uppercase font-bold py-4">Approve Booking</h3>
                                            <ul className="text-slate-600 bg-white rounded-lg text-md px-4 py-4 w-[30rem]">
                                                <h3 className="text-yellow-600 text-2xl py-2">
                                                    Booking User Data
                                                </h3>
                                                <li>
                                                    ID : {booking.id}
                                                </li>
                                                <li>
                                                    Name : {booking.user_name}
                                                </li>
                                                <li>
                                                    email : {booking.user_email}
                                                </li>
                                                <li>
                                                    Tel : {booking.user_phone}
                                                </li>
                                                <li>
                                                    booked Seats : {booking.seats.map(seat => seat.row + seat.seat_number).join(', ')} 
                                                </li>
                                                <li className="text-yellow-600">
                                                    Price : {booking.price} Ks
                                                </li>

                                                <h3 className="text-yellow-500 uppercase pt-4">Cinmema</h3>
                                                <li>
                                                    Cinema Name : {booking.schedule.room.cinema.cinema_name}
                                                </li>
                                                <li>
                                                    Room Number : Cinema - {booking.schedule.room.room_number}
                                                </li>
                                            </ul>

                                            <div className="flex gap-2">
                                                {booking.status === "booked" ? (
                                                    <button
                                                    onClick={handleBookingApprove}
                                                    className="rounded-full  my-6 px-4 py-2 bg-yellow-400"
                                                    >
                                                        Approve This Booking
                                                    </button>
                                                ) : (
                                                    <p className="my-6 px-4 py-2 text-yellow-400">
                                                        This Booking is already confirmed
                                                    </p>
                                                )
                                                }
                                                
                                                <form onSubmit={handleDelete}>
                                                    <button
                                                    type="submit"
                                                    className="rounded-full  my-6 px-4 py-2 bg-red-600"
                                                    >
                                                        Cancel
                                                    </button>
                                                </form>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-6 items-center w-fit mx-auto">
                                            <div className='w-full my-4'>
                                                <h3 className="text-yellow-400 uppercase text-xl text-left">Room Structure</h3>
                                                <p>{booking.schedule.room.cinema.cinema_name}</p>
                                            </div>
                                            {Object.entries(roomLayout).map(([key, value]) => {

                                                return (
                                                    <>
                                                    <div className="flex flex-col gap-4 items-center">
                                                        {Object.entries(value.layout).map(([key,layout]) => {
                                                            let rowNo = key;
                                                            let n = 0;
                                                            return (
                                                                <>
                                                                <div className="flex gap-6">
                                                                    {layout.map((seatNo,i) => {  
                                                                       n += seatNo;
                                                                       return (
                                                                        <>
                                                                        <div className="flex gap-2">
                                                                            {
                                                                                range( n-seatNo || 0, n ).map(seat => {

                                                                                    let seatNumber = seat+1
                                                                                    
                                                                                    return (
                                                                                    <>
                                                                                        {isThatSeat(bookedSeats, rowNo+seatNumber) ? (
                                                                                            <>
                                                                                            <Link
                                                                                            href={route('admin.schedule.room', {slug : booking.schedule.slug})}
                                                                                            >
                                                                                                <div className="w-[0.8rem] h-[0.8rem] bg-red-500 rounded-md"></div>
                                                                                            </Link>
                                                                                            </>
                                                                                        ) : (

                                                                                            <>
                                                                                                <div className="w-[0.8rem] h-[0.8rem] bg-blue-500 rounded-md"></div>
                                                                                            </>
                                                                                        )}
                                                                                    </>
                                                                                )})
                                                                            }
                                                                        </div>
                                                                        </>
                                                                       )
                                                                    })}
                                                                </div>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                    </>
                                                    
                                                )
                                            })}
                                        </div>
                                    </div>
                                    </>
                                )}
                            </div>


                            

                    </div>

                </div>
            </AdminLayout>
        </div>
        </>
    )
}

export default Booking;

// return (
//     <>
//         <div className="w-4 h-4 bg-blue-500 rounded-md">ff</div>
//     </>
// )