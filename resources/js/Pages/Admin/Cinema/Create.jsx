import FormInput from "@/Components/FormInput.";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

const Create = () => {

    const {
        data,
        setData,
        reset,
        errors,
        post,
    } = useForm({
        cinema_name : '',
        cinema_location :""
    })

    const handleCinemaName = (e) => {
        setData('ciname_name', e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        post(route('admin.cinema.store'), {
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
                <h3 className="text-yellow-400 uppercase text-xl">Create Cinema</h3>
                <form onSubmit={handleSubmit}>
                    <FormInput
                    label='Enter Cinema Name'
                    name='cinema_name'
                    placeholder='Cinema Name'
                    onChange={handleCinemaName}
                    value={data.ciname_name}
                    error = {errors.ciname_name}
                    />


                    <div className="my-6 pt-8 border-t-[0.01rem] border-slate-600">
                        <h3 className="text-xl mb-2">Please Fill Cinema Location</h3>
                        <p>
                            Use Google map to get latitude and longtitude
                        </p>

                        <FormInput
                        label='Enter Cinema location'
                        name='location'
                        placeholder='16.990827613938922, 96.10720539866499'
                        onChange={handleCinemaLocation}
                        value={data.cinema_location}
                        error = {errors.cinema_location}
                        />
                    </div>

                    <button
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2"
                    >
                        Create Cinema
                    </button>
                </form>
            </section>
        </AdminLayout>
    )
}

export default Create; 