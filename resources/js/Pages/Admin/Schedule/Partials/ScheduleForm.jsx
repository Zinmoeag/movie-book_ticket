import FormDateInput from "@/Components/FormDateInput";
import { useForm, Link } from "@inertiajs/react";
import FormInput from "@/Components/FormInput.";
import { useState } from "react";
import SelectInput from "@/Components/SelectInput";
import RoomSelectorComponenst from "./RoomSelectorComponents";
import DateTimeForm from "./DateTimeForm";

const ScheduleForm = ({movies, rooms, cinemas}) => {

    const {
        data, 
        setData, 
        post,
        put,
        delete: destroy,
        processing,
        errors
    } = useForm({
        movie_id : '',
        date : '',
        time : '',
        room_id : [],
    });

    const [cinemaMenuShow, setCinemaMenuShow] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/admin/schedule/create', data);
    }

    const handleSelect = (roomId) => {

        let existedRoom = data.room_id.indexOf(roomId) >= 0;
        if(existedRoom){
            const updatedRooms = data.room_id.filter(existed => existed !== roomId);
            setData('room_id', updatedRooms);
        }else{
            setData('room_id', [
                ...data.room_id,
                roomId,
            ])
        }

    }
    
    return (
        <>
            <form action="" className="py-6 text-white" onSubmit={handleSubmit}>

                <div className="flex flex-col w-[30rem]">

                    <SelectInput
                    label='Choose Movie  for this Schedule'
                    options={movies}
                    defaultSelected="Choose Movie"
                    onChange={value => setData('movie_id', value)}
                    />

                </div>

                <div>
                    <DateTimeForm
                    data={data}
                    setData={setData}
                    />
                </div>

                <div>
                    <RoomSelectorComponenst
                    cinemas = {cinemas}
                    handleSelect={handleSelect}
                    selectedItems={data.room_id}
                    />
                </div>




                <div className="mt-8 pt-4 border-t-2 border-slate-600">
                    <button
                    className="bg-blue-600 text-white px-8 py-2"
                    >
                        Submit
                    </button>
                </div>

            </form>
        </>
    )
}

export default ScheduleForm;