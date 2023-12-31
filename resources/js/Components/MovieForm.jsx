import { useForm } from "@inertiajs/react";
import { useState } from "react";
import FormInput from "./FormInput.";
import FormDateInput from "./FormDateInput";
import Cropper from "@/Utilities/Cropper";
import Card from "./Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MovieForm = ({action, preData, destroyAction}) => {
    
    const {
        data, 
        setData, 
        post,
        put,
        delete: destroy,
        processing,
        errors
    } = useForm(preData ? {
        movie : preData.movie,
        release_date : preData.release_date,
        duration : preData.duration,
        movie_photo : null,
    } : {
        movie : "",
        release_date : "",
        duration : "",
        movie_photo : "",
    });


    const [selectedImgPreview, setSelectedImgPreview] = useState(preData && preData.movie_photo || null);
    const [imageBoxToggle, setImageBoxToggle] = useState(false);

    const handleOnChange = (e) => {
        setData(e.target.id, e.target.value)
    }

    const handleFile = (e) => {
        console.log(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(action.method === 'post'){
            post(action.url, data);
        }else if(action.method === 'put'){
            put(action.url, data);

            console.log(data);
        }
    }
    const handleImageFile = (imgObj) => {
        setData("movie_photo",  imgObj.file)
        setSelectedImgPreview(imgObj.dataUrl)

        setImageBoxToggle(false)
    }

    //handle destroy
    const handleDestroy = (e) => {
        e.preventDefault();

        if(destroyAction?.url){
            destroy(destroyAction.url)
        }
    }

    return (

    <div className="flex">
        <div className="flex flex-col gap-2 flex-1">

            <form onSubmit={handleSubmit}> 

                <button
                type="button"
                className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg"
                onClick={e => setImageBoxToggle(true)} 
                >
                    Upload Image
                </button>

                {errors.movie_photo && <p className="text-red-500">{errors.movie_photo}</p>}

                <FormInput 
                label = "Movie Name"
                name = 'movie'
                id = 'movie'
                placeholder='Enter movie name'
                onChange={handleOnChange}
                value={data.movie}
                error = {errors.movie}
                />

                <FormInput 
                label = "Duration"
                id = 'duration'
                name = 'duration'
                placeholder='Enter movie name'
                onChange={handleOnChange}
                value={data.duration}
                error = {errors.duration}
                />

                <FormDateInput
                id='release_date'
                label='Release Date'
                onChange={handleOnChange}
                value = {data.release_date}
                error={errors.release_date}
                />

                {imageBoxToggle && (
                    <div className="bg-slate-900 absolute z-20 left-0 top-0 right-0 bottom-0">
                        <div className="flex items-center justify-center h-full">
                            <div className="w-[40rem] bg-slate-700 rounded-lg px-4 py-6">
                                <Cropper
                                    name = 'movie_photo'
                                    onGetCropImg = {handleImageFile}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button
                type="submit"
                className="mt-6 bg-blue-400 hover:bg-blue-800 py-2 px-6 text-white"
                > Add Flim
                </button>
            </form>
            
            {destroyAction && (

                <div className="border-t-[0.01rem] mt-5 pt-10 border-slate-600">
                    <h3 className="text-white bg-slate-600 px-2 py-2 mb-4">Other Options</h3>

                    {destroyAction && (
                        <form onSubmit={handleDestroy}>
                            <button 
                            className="w-[7rem] h-[7rem] border-red-600 border-[0.1rem] hover:bg-red-600 rounded-md gap-2 text-white flex flex-col items-center justify-center"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <span>
                                    Delete Movie
                                </span>
                            </button>
                        </form>
                    )}
                </div>
                
            )}

        </div>
        <div className="flex item-center justify-center w-fit px-14">
            <div className="flex-1">
                <div className="flex item-center justify-center">
                    <Card 
                    img = {selectedImgPreview}
                    title = {data.movie || ""}
                    releaseDate={data.release_date}
                    duration={data.duration}
                    />
                </div>
            </div>
        </div>

    </div>

    )
}

export default MovieForm;