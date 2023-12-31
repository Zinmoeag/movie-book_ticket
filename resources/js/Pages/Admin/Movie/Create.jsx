import AdminLayout from "@/Layouts/AdminLayout"
import FormInput from "@/Components/FormInput."
import FormDateInput from "@/Components/FormDateInput"
import { useForm } from "@inertiajs/react"
import Cropper from '../../../Utilities/Cropper'
import { useState } from "react"
import MovieForm from "@/Components/MovieForm"
import Card from "@/Components/Card"

export default function Create(){
    
    return (
        <>
            <AdminLayout>
                <div className="px-8 py-6 text-slate-400">

                    <div className="border-b-[0.01rem] border-yellow-600 pb-2 mb-6">
                        <h3 className=" uppercase text-2xl font-bold">Add Flim</h3>
                    </div>

                    
                    <MovieForm 
                    action={{method : "post", url : "/admin/movie/create"}}
                    />
                    

                </div>
            </AdminLayout>
        </>
    )
}