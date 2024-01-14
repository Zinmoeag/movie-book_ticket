import { useState } from "react";
import { useForm } from "@inertiajs/react";

const useAdminBooking = () => {

    const {
        data,
        setData,
        delete: destroy
    } = useForm()

    const [adminPage, setAdminPage] = useState(false);

    const initializePage = (user, isAdminPage) => {
        if(user?.role === 'admin' && isAdminPage){
            setAdminPage(true)
        }
    }

    const destroyBooking = (url) => {
        destroy(url)
    }

    

    return {
        adminPage, 
        initializePage,
        destroyBooking,
    }
}

export default useAdminBooking;