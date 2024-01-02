const BookingInfo = ({bookingInfo}) => {

    return (
        <>
            <section>
                <ul className="mb-4 pb-4 border-b-[0.01rem] border-slate-400">
                    <li className="text-yellow-400 text-xl mb-4">
                        Movie : Oppenheimer
                    </li>
                    <li className="text-sm">
                        (Date : 20-4-2000, Time : 12:00)
                    </li>
                    <li>
                        Cinema : fjiyvoiej
                    </li>
                    <li>
                        room : cinema - 4
                    </li>
                </ul>
                <ul className="flex flex-col gap-2">
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
            </section>
        </>
    )
}

export default BookingInfo