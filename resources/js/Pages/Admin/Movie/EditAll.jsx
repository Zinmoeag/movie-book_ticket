import AdminLayout from "@/Layouts/AdminLayout";
import Card from "@/Components/Card";
import { Link } from "@inertiajs/react";

const EditAll = ({movies}) => {

    console.log(movies)
    return (
        <AdminLayout>
            <div className="px-6 py-6 text-white">
                <h3 
                className="text-2xl uppercase font-bold bg-red-700 px-2 py-2 mb-6"
                >Edit Movies in Theatre
                </h3>
                <div className="flex gap-4 flex-wrap">
                
                {
                    movies.map(movie => (
                        <Link href={route('admin.movie.edit', {slug : movie.slug})}>
                            <Card 
                            img = {movie.movie_photo}
                            title = {movie.movie}
                            releaseDate={movie.release_date}
                            duration={movie.duration}
                            />
                        </Link>
                    ))
                }
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditAll;