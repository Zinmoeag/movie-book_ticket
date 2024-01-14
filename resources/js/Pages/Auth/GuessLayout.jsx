import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";


const withAuthLogic = (WrappedConponent) => {

    return (props) => {

        const { data, setData, post, processing, errors, reset } = useForm({
            email: '',
            password: '',
            remember: false,
        });
        
        useEffect(() => {
            return () => {
                reset('password');
            };
        }, []);


        const form = {
            data, setData, post, processing, errors, reset
        }

        return (
            <>
            <div className=''>
                <div className="absolute text-red-400 right-2 top-2">
                        <button
                        type="button"
                        onClick={e => props.setIsClose()}
                        >
                            Close
                        </button>
                </div>
                <div className="bg-slate-800 h-screen text-white px-32">
                
                    <div className="flex gap-14 justify-between items-center h-full">
                        <div className="flex flex-col ">
                            <h3 className="text-[6rem] text-yellow-400 uppercase font-bold">
                                <Link
                                href='/'
                                >
                                    Cinephie
                                </Link>
                            </h3>
                            <p className="text-slate-400 text-lg">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat veniam quas reiciendis, deserunt beatae unde dignissimos consequuntur repudiandae ipsam enim dicta iure sunt neque hic laborum odio dolore doloribus nisi?
                            </p>
                        </div>
                        <div className="flex-1">
                            <WrappedConponent
                            {...props}
                            form = {form}
                            />
                        </div>
                    </div>
                </div>
            </div>
            </>            
        )
    }
}

export default withAuthLogic;