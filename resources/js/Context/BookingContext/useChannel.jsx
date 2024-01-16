import { useEffect } from "react";

const useChannel = () => {

    const getBookingChannel = (schedule) => {
        return window.Echo.channel(`booking.${schedule}`);
    }


    const getAdminChannel = (user, schedule) => {
        if(user?.role === 'admin'){
            return window.Echo.private(`adminBooking.${schedule}`);
        }
        return null;
    }

    return {
        getBookingChannel,
        getAdminChannel,
    }
}

export default useChannel;