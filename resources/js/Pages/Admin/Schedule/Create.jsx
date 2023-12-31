import AdminLayout from "@/Layouts/AdminLayout";
import ScheduleForm from "./Partials/ScheduleForm";

const Create = ({movies, rooms, cinemas}) => {



    return (

        <AdminLayout>
            <div className="px-4 py-4">
                <h3 className="text-xl uppercase text-white font-bold">Create New Schedule</h3>

                <ScheduleForm
                movies={movies}
                rooms={rooms}
                cinemas={cinemas} 
                />
            </div>
        </AdminLayout>
    )
}

export default Create;