import { useContext, createContext } from "react";
import useSeatState from './useSeatState';


const SeatContext = createContext(null);

export const SeatProvider = ({children}) => {
	return (
		<SeatContext.Provider value={{useSeatState}}>
			{children}
		</SeatContext.Provider> 
	)
}

export const useSeat = () => useContext(SeatContext);