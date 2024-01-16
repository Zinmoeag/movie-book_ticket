import { useState } from "react";
import { useForm } from "@inertiajs/react";

const useAdminBooking = () => {

    const {
        post,
        delete: destroy
    } = useForm()

    const [adminPage, setAdminPage] = useState(false);

    const initializePage = (user, isAdminPage) => {
        if(user?.role === 'admin' && isAdminPage){
            setAdminPage(true)
        }
    }

    const destroyBooking = (url) => {
        destroy(url, {
            onSuccess : () => {
                alert('Successfully Cancle')
            }
        })
    }

    const approveBooking = (url) => {
        post(url, {
            onSuccess : () => {
                alert('Successfully Approve This Booking')
            }
        })
    }

    

    return {
        adminPage, 
        initializePage,
        destroyBooking,
        approveBooking,
    }
}

export default useAdminBooking;