import { useContext, createContext } from "react";
import useBookingState from "./useBookingState";

const BookingContext = createContext(null);

export const BookingProvider = ({children}) => {
    
    const BookingState = useBookingState();
 
    return (
        <BookingContext.Provider value={{...BookingState}}>
            {children}
        </BookingContext.Provider>    
    )
}


export const useBooking = () => useContext(BookingContext);