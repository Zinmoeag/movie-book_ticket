import AdminLayout from "@/Layouts/AdminLayout";
import FilterDropDown from "@/Components/FilterDropDown";
import { Link } from "@inertiajs/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Schedule = ({schedules, dates, movies}) => {

    return (
        <AdminLayout>
            <div className="px-4 py-4">
                <h3 className="text-yellow-400 font-bold text-2xl uppercase mb-4">Schedules</h3>

                <div className="flex gap-2 justify-end mb-4">
                    <FilterDropDown 
                    display="date"
                    menu = {dates}
                    query
                    routeName = {'admin.schedule'}
                    parameter = 'date'
                    />

                    <FilterDropDown 
                    display="Movie"
                    menu = {movies}
                    query
                    routeName = {'admin.schedule'}
                    parameter = 'movie'
                    />

                </div>
            
                <div className="flex gap-2 flex-col">
                    {Object.entries(schedules).map(([key, value]) => (
                        <>
                            
                        <div className="py-2 bg-slate-950">
                            <h3 className="px-4 text-white">
                                {key}
                            </h3>

                        </div>
                        <div>
                            <table border="1" className="w-full text-white">
                                <thead className="bg-slate-500">
                                    <tr>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Cinema/Room</th>
                                    <th>Available Seat</th>
                                    <th>Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                  
                                </tbody>
                                    {value.map(item => (
                                        <tr>
                                            <td>{item.movie?.movie}</td>
                                            <td>{item.date?.date}</td>
                                            <td>{item.date?.time}</td>
                                            <td>{item.room?.cinema?.cinema_name}/cinema-{item.room?.room_number}</td>
                                            <td>{item.available_seats}</td>
                                            <td className="flex justify-center gap-4 px-4">
                                                <Link className="text-blue-600">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                                <Link
                                                className="text-green-500"
                                                href={route('admin.schedule.room', {slug : item.slug})}
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                            </table>
                        </div>
                        </>
                    ))}
                </div>

            </div>
        </AdminLayout>
    )
}

export default Schedule;    