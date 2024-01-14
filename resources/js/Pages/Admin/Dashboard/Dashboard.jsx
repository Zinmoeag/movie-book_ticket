import AdminLayout from "@/Layouts/AdminLayout";
import { AdminProvider } from "@/Context/AdminContext/AdminContext";
import BookingChart from "./Partials/BookingChart";

const DashBoard = ({movie_seat_rating}) => {
    return (
        <>
        <div>
            <AdminLayout>
                <AdminProvider>
                    <div className="px-6 py-6">
                        <section className="w-[40rem]">
                            <BookingChart
                            initialData = {movie_seat_rating}
                            />
                        </section>
                    </div>

                </AdminProvider>
            </AdminLayout>
        </div>
        </>
    )
}

export default DashBoard;