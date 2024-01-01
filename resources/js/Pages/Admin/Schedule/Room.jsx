import AdminLayout from "@/Layouts/AdminLayout";
import RoomSeat from "@/Components/RoomSeat";
import { BookingProvider } from "@/Context/BookingContext/BookingContext";
import { DropMenuProvider } from "@/Context/DropMenu/DropMenu";
import BookingForm from "@/Components/BookingForm";

const Room = ({scheduleSeats, seats, room, schedule, movie, date}) =>{

    return (
        <>
            <section className="bg-slate-800">
                <BookingProvider>
                    <div className="text-white py-8 px-6">
                        <div id="schedule_info" className="py-6 px-8 fixed z-30 top-0 right-0 left-0 bg-slate-950/70 backdrop-blur-md">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-2xl uppercase text-2xl text-yellow-400 font-bold">{movie.movie}</h3>
                                    <p>{room.cinema.cinema_name} | <span>Cinema - {room.room_number}</span></p>
                                    <p>({date.date} | <span>Cinema - {date.time}</span>)</p>
                                </div>
                                <div>
                                    <p>Avaliabe Seat -
                                        <span className="text-green-400">
                                            {scheduleSeats.available_seats}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-[8rem]">
                            <h3 className="mb-8 py-2 px-2 bg-slate-400">Seats</h3>
                            <RoomSeat
                            seats={seats}
                            room={room}
                            schedule={schedule.slug}
                            />
                        </div>

                        <div className="bg-red-800 py-8 px-4 mt-[8rem] rounded-xl">
                            <BookingForm 
                            action={schedule.slug}
                            />
                        </div>
                    </div>
                </BookingProvider>
            </section>
        </>
    )
}

export default Room;