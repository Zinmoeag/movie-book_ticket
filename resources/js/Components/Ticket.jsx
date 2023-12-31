const Ticket = ({booking}) => {
    return (
        <div id='ticket' className="shadow-lg">
            <div className='flex w-[40rem]'>
                <div className='relative w-[10rem] h-[15rem] overflow-hidden rounded-lg'>
                    <img 
                    src="https://pbs.twimg.com/media/FvUVt3hXgAAxP1H?format=jpg&name=900x900"
                    className='absolute z-10'
                    alt="" 
                    />
                </div>
                <div className='bg-white flex-auto  h-[15rem] rounded-lg px-4 py-2 border-s-[0.1rem] border-dashed border-red-950 bg-gradient-to-r from-40% from-orange-300/40 to-white'>
                    <div className='border-b-[0.1rem] border-slate-400 pb-2'>
                        <h3 className='uppercase text-xl font-bold text-red-950'>{booking.movie_name}</h3>
                        <p className='text-red-900 text-sm'>{booking.cinema_name} - Cinema {booking.room_number}</p>
                        <p className='text-slate-900 text-sm'>({booking.schedule.date} | {booking.schedule.time})</p>
                    </div>
                    <ul className='text-slate-900 text-sm'>
                        <li>{booking.booking_user_name}</li>
                        <li>{booking.booking_user_phone}</li>
                        <li>
                            Seat : 
                            <span>
                                {booking.seats.map(seat => (
                                    <span>{seat.row}-{seat.seat_number},</span>
                                ))}
                            </span>
                        </li>
                        <li className='text-red-800'>Price : {booking.price} Ks</li>
                    </ul>
                </div>

            </div>
    </div>
    )
}

export default Ticket;