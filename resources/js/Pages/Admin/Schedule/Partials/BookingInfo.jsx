import { Link } from "@inertiajs/react"

const BookingInfo = ({bookingInfo}) => {

    return (
        <>
            <section>
                <ul className="flex flex-col gap-2 my-6">
                    <li className="uppercase text-[4rem] text-yellow-400">
                        {bookingInfo.seats[0].status}!
                    </li>
                    <li>
                        Booking Id : {bookingInfo.id}
                    </li>
                    <li>
                        Booking Username : {bookingInfo.user_name}
                    </li>
                    <li>
                        Phone : {bookingInfo.user_phone}
                    </li>
                    <li>
                        email : {bookingInfo.user_email}
                    </li>
                    <li className="text-wrap">
                        Booked Seats : {bookingInfo.seats.map(seat => seat.row + seat.seat_number).join(', ')}
                    </li>
                    <li className="text-yellow-400">
                        Total Price : {bookingInfo.price}
                    </li>
                </ul>
                <Link
                only={['booking']}
                href={route('admin.booking')}
                data={{booking_id : bookingInfo.id}} 
                className="px-6 py-2 my-6 bg-blue-600">
                   Go to Booking
                </Link>
            </section>
        </>
    )
}

export default BookingInfo