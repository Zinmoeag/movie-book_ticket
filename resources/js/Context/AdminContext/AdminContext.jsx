import { createContext, useContext } from "react";
import useBookingState from './useBookingState'

const AdminContext = createContext(null)

export const AdminProvider = ({children}) => {
    const booking  = useBookingState()

    return (
        <AdminContext.Provider value={{booking}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)