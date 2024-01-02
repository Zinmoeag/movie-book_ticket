import { useContext, createContext } from "react";
import useSeatState from './useSeatState';


const SeatContext = createContext(null);

export const SeatProvider = ({children}) => {
	const seatState = useSeatState();

	return (
		<SeatContext.Provider value={{...seatState}}>
			{children}
		</SeatContext.Provider> 
	)
}

export const useSeat = () => useContext(SeatContext);