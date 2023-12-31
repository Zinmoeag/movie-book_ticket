import AppLayout from "@/Layouts/AppLayout";
import Ticket from "@/Components/Ticket";

const BookingConfirmatoin = ({booking}) => {

    console.log(booking)
    return (
        <>
            <AppLayout>
                <section>
                    <div className="px-6">
                        <h3 className="text-[5rem] uppercase font-bold text-green-500 text-center py-8">Successfully Booked!</h3>
                        <h3 className="text-center text-2xl">Here is Your Ticket, We already send mail to Your Inbox</h3>
                    </div>

                    <div className="flex flex-col items-center justify-center py-6 px-4 w-fit mx-auto">

                        <div id='ticket_area' className="my-8">
                            <Ticket
                            booking = {booking}
                            />
                        </div>

                        <p className="self-end py-2">Somethings went wrong?</p>
                        <button className="bg-blue-500 hover:bg-red-600 py-2 px-6 rounded-full self-end">Cancle Booking</button>
                    </div>

                </section>
            </AppLayout>
        </>
    )
}
export default BookingConfirmatoin; 