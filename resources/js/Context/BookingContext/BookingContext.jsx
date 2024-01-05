import { useContext, createContext } from "react";
import useBookingState from "./useBookingState";
import useAdminBooking from './useAdminBooking';
import useChannel from "./useChannel";

const BookingContext = createContext(null);

export const BookingProvider = ({children}) => {
    
    const BookingState = useBookingState();
    const admin = useAdminBooking();
    const channel = useChannel();


    return (
        <BookingContext.Provider value={{...BookingState, ...admin, channel}}>
            {children}
        </BookingContext.Provider>    
    )
}


export const useBooking = () => useContext(BookingContext);