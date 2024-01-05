import { useState } from "react";

const useAdminBooking = () => {

    const [adminPage, setAdminPage] = useState(false);

    const initializePage = (user, isAdminPage) => {
        if(user?.role === 'admin' && isAdminPage){
            setAdminPage(true)
        }
    }

    return {
        adminPage, 
        initializePage,
    }
}

export default useAdminBooking;