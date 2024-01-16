import AppLayout from '../Layouts/AppLayout'
import RoomSeat from '@/Components/RoomSeat';
import BookingForm from '@/Components/BookingForm';
import { BookingProvider } from '@/Context/BookingContext/BookingContext';
import { SeatProvider } from '@/Context/SeatContext/SeatContext';
import { DropMenuProvider } from '@/Context/DropMenu/DropMenu';
import { usePage } from '@inertiajs/react';



const ScheduleRoom = ({seats, schedule, room, movie, date, price}) => {


    const {
        props : {
            auth : {user}
        }
    } = usePage()

    function roleColorGenerator(role) {
        if (role === 'front') {
            return 'bg-red-400';
        } else if (role === 'mid') {
            return 'bg-green-600';
        } else if (role === 'back') {
            return 'bg-blue-400';
        } else if (role === 'couple') {
            return 'bg-yellow-400';
        }
    }

    return (
        <>
            <AppLayout
            authUser = {user}
            >
                <BookingProvider>
                    <SeatProvider>
                            <div className='px-16 py-4'>
                                <div className='flex items-center justify-between py-4 px-4 text-lg bg-gradient-to-r from-rose-600 to-amber-400 my-8'>

                                    <div className='flex'>
                                        <div>
                                            <h3 className='text-2xl uppercase font-bold'>{movie.movie}</h3>
                                            <p className='text-red-950 text-sm'>
                                                {room.cinema.cinema_name} |
                                                <span className='text-blue-300'> Cinema - {room.room_number}</span>
                                            </p>
                                        </div>
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
                                            book_seat ={ null}
                                        />

                                    </div>

                                    <div className='flex gap-6 w-fit mx-auto'>
                                        <div className='w-[60rem] bg-gradient-to-r from-rose-600 to-amber-400 px-4 py-6 rounded-tl-[30px]'>
                                            
                                            <div className='py-4 border-b-[0.1rem] border-dashed border-red-900 '>
                                                <h3 className='text-2xl text-white uppercase font-bold'>
                                                    Let's Book now!
                                                </h3>
                                            </div>

                                            <BookingForm
                                            action= {schedule}
                                            />
                                        </div>

                                        <div id='price' className='flex flex-col gap-4'>
                                            {price.map(price => (
                                                <>
                                                <div className='flex gap-6 items-center text-sm'>
                                                    <div className={'w-4 h-4 ' + roleColorGenerator(price.role)}></div>
                                                    <h3>{price.price} Ks</h3>
                                                </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                            </div>
                    </SeatProvider>
                </BookingProvider>
            </AppLayout>
        </>
    )
}

export default ScheduleRoom;