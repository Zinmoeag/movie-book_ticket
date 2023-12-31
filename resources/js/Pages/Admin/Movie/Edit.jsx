import AdminLayout from "@/Layouts/AdminLayout";
import MovieForm from "@/Components/MovieForm";

const Edit = ({movie}) => {

    return(

        <AdminLayout>
            <div className="py-6 px-6 text-white  ">
                <h3 className="text-xl uppercase font-bold text-white mb-8">Edit Movie</h3>

                <MovieForm
                action = {{
                    method : "post",
                    url : route('admin.movie.update', {
                            slug : movie.slug
                        })
                }}
                destroyAction = {{url : route('admin.movie.delete', {
                    slug : movie.slug
                })}}
                preData={movie}
                />
                
            </div>

        </AdminLayout>

    )
}

export default Edit;