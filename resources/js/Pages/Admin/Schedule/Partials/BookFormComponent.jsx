import { useBooking } from "@/Context/BookingContext/BookingContext";
import BookingForm from "@/Components/BookingForm";

const BookFormComponent = ({action, schedule}) => {
    const {
        submitBooking,
    } = useBooking();

    return (
        <>
            <div className="bg-red-800 py-8 px-4 mt-[8rem] rounded-xl">
                <BookingForm
                schedule = {schedule}
                onSubmit={e => submitBooking(action)}
                />
            </div>
        </>
    )
}

export default BookFormComponent;