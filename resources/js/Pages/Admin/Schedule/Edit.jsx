import AdminLayout from "@/Layouts/AdminLayout";
import DateTimeForm from "./Partials/DateTimeForm";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import RoomSelectorComponenst from './Partials/RoomSelectorComponents'

const Edit = ({ schedule, movies, cinemas }) => {

    const {
        data,
        setData,
        put,
    } = useForm({
        date : '',
        time : '',
        room_id : '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('admin.schedule.update.date', {slug : schedule.slug}),{
            onSuccess : () => {
                alert('successfully Update Date')
            }
        });
    }

    const handleMovieSubmit = (e) => {
        e.preventDefault();
        put(route('admin.schedule.update.movie', {slug : schedule.slug}),{
            onSuccess : () => {
                alert('successfully Change Movie')
            }
        });
    }

    const handleRoomSubmit = (e) => {
        e.preventDefault();
        put(route('admin.schedule.update.room', {slug : schedule.slug}),{
            onSuccess : () => {
                alert('successfully change Room')
            }
        });

    }


    const handleSelect = (room_id) => {
        setData('room_id', room_id);
    }

    return (
        <>
            <AdminLayout>
                <div className="text-white py-4 px-6">
                    <div>
                        <h3 className="text-xl">Edit Schedule</h3>
                        <div className=" my-6 py-4 border-slate-600 border-y-[0.01rem]">
                            <h3 className="pb-2">Change Date and Time</h3>
                            <form onSubmit={handleSubmit}>
                               <DateTimeForm
                               data={data}
                               setData={setData}
                               />
                                <button
                                type="submit"
                                className="py-2 px-6 bg-slate-900 hover:bg-slate-950"
                                >
                                    Update Date & Time
                                </button>
                            </form>

                        </div>
                    </div>

                    <div className=" my-6 py-4 border-slate-600 border-y-[0.01rem]">
                        <div className="flex flex-col w-[30rem]">
                            <form onSubmit={handleMovieSubmit}>
                                <div className="my-4">
                                    <SelectInput
                                    label='Choose Movie for this Schedule'
                                    options={movies}
                                    defaultSelected="Choose Movie"
                                    onChange={value => setData('movie_id', value)}
                                    />
                                </div>
                                <button
                                type="submit"
                                className="py-2 px-6 bg-slate-900 hover:bg-slate-950"
                                >
                                    Update Movie
                                </button>
                            </form>
                        </div>
                    </div>

                    
                    <div className=" my-6 py-4 border-slate-600 border-y-[0.01rem]">
                        <form onSubmit={handleRoomSubmit}>
                            <RoomSelectorComponenst
                            cinemas = {cinemas}
                            handleSelect={handleSelect}
                            selectedItems={[data.room_id]} 
                            />

                            <button
                            type="submit"
                            className="py-2 px-6 bg-slate-900 hover:bg-slate-950"
                            >
                                Change Room
                            </button>
                        </form>
                    </div>

                </div>
            </AdminLayout>
        </>
    )

}

export default Edit;    