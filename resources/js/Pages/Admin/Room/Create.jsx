import FormInput from "@/Components/FormInput.";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";


const Create = ({cinemas}) => {

    // const {errors} = usePage();

    const {
        data,
        setData,
        reset,
        errors,
        post,
    } = useForm({
        room_number : "",
        room_type : "",
        cinema_id : '',
    })

    console.log(errors)

    const handleCinemaName = (e) => {
        setData('ciname_name', e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post(route('admin.room.store'), {
            onSuccess : page => {
                reset()
            }
        })
    }

    const handleCinemaLocation = (e) => {
        setData('cinema_location', e.target.value)
    }

    return (
        <AdminLayout>
            <section className="text-white py-6 px-6">
                <h3 className="text-yellow-400 text-2xl uppercase">
                    Create Room
                </h3>

                <form 
                onSubmit={handleSubmit}
                className="w-[25rem]"
                >
                    <SelectInput
                    label={'Choose Cinema'}
                    options={cinemas}
                    defaultSelected={'Choose Cinma'}
                    onChange={value => setData('cinema_id', value)}
                    error={errors.room_type}
                    />

                    <div className="border-y-[0.02rem] border-slate-400 py-4">
                        <h3 className="text-slate-500">There is two type of Room normal and smart</h3>
                        <SelectInput
                        label={'Choose Room Type'}
                        options={[
                            {id:1, name : 'Normal', value : 'normal'},
                            {id:2, name : 'smart', value: 'smart'},
                        ]}
                        defaultSelected={'Choose Room Type'}
                        onChange={value => setData('room_type', value)}
                        error={errors.room_type}
                        />
                    </div>

                    <div className="mt-6">
                        <FormInput
                        label = 'Room Number'
                        name = 'room_number'
                        placeholder = 'Enter Room Number'
                        onChange = {e => setData('room_number', e.target.value)}
                        value = {data.room_number}
                        error = {errors.room_number}
                        />
                    </div>

                    <button
                    className="py-4"
                    type="submit"
                    >
                        Submit
                    </button>

                </form>

            </section>
        </AdminLayout>
    )
}

export default Create; 