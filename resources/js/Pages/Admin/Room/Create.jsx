import FormInput from "@/Components/FormInput.";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

const Create = ({cinemas}) => {

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

    console.log(cinemas)

    const handleCinemaLocation = (e) => {
        setData('cinema_location', e.target.value)
    }

    return (
        <AdminLayout>
            <section className="text-white py-6 px-6">
                <h3 className="text-yellow-400 text-2xl uppercase">
                    Create Room
                </h3>

                <form action="">
                    <SelectInput
                    label={'Choose Cinema'}
                    options={cinemas}
                    defaultSelected={'Choose Cinma'}
                    onChange={value => setData('cinema_id', value)}
                    />
                </form>
            </section>
        </AdminLayout>
    )
}

export default Create; 