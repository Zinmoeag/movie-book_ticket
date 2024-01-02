import AppLayout from '../Layouts/AppLayout'
import RoomSeat from '@/Components/RoomSeat';
import BookingForm from '@/Components/BookingForm';
import { BookingProvider } from '@/Context/BookingContext/BookingContext';
import { SeatProvider } from '@/Context/SeatContext/SeatContext';
import { DropMenuProvider } from '@/Context/DropMenu/DropMenu';



const ScheduleRoom = ({seats, schedule, room, movie, date, user}) => {

    // console.log(user)
    return (
        <>
            <AppLayout>
                <BookingProvider>
                    <SeatProvider>
                            <div className='px-16 py-4'>
                                <div className='flex items-center justify-between py-4 px-4 text-lg bg-gradient-to-r from-rose-600 to-amber-400 my-8'>

                                    <div>
                                        <h3 className='text-2xl uppercase font-bold'>{movie.movie}</h3>
                                        <p className='text-red-950 text-sm'>
                                            {room.cinema.cinema_name} |
                                            <span className='text-blue-300'> Cinema - {room.room_number}</span>
                                        </p>
                                    </div>

                                        <div className='text-slate-800'>
                                            <h3>Show date - {date.current_date}</h3>
                                            <h3 className='bg-slate-900 text-white px-2'>Time - {date.current_time}</h3>
                                        </div>
                                    </div>

                                    <div id='screen' className='flex items-center justify-center flex-col mb-20'>
                                        <img src="/images/screen.png" className='w-3/5' alt="" /> 
                                        <h3 className='text-blue-300'>Screen</h3>
                                    </div>

                                    <div id='seats' className='flex flex-col mb-36 gap-4 w-fit mx-auto'>
                                        <h3 className='text-center text-xl'>Seat</h3>
                                        <RoomSeat
                                            authUser={null}
                                            bookingInfo={null}
                                            seats={seats}
                                            room={room}
                                            schedule={schedule}
                                        />
                                    </div>

                                    <div className='w-[60rem] mx-auto bg-gradient-to-r from-rose-600 to-amber-400 px-4 py-6 rounded-t-[30px]'>
                                        
                                        <div className='py-4 border-b-[0.1rem] border-dashed border-red-900 '>
                                            <h3 className='text-2xl text-white uppercase font-bold'>
                                                Let's Book now!
                                            </h3>
                                        </div>

                                        <BookingForm
                                        action= {schedule}
                                        />
                                    </div>
                            </div>
                    </SeatProvider>
                </BookingProvider>
            </AppLayout>
        </>
    )
}

export default ScheduleRoom;