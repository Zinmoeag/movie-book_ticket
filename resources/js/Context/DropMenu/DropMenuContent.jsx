import { useContext, createContext, useState } from "react";
// import { DropMenu } from "./DropMenu";
import useDropMenuState from './useDropMenuState'

const DropMenuContext = createContext(null)

export const DropMenuProvider = ({children}) => {

    const dropMenuState = useDropMenuState();

    return (
        <DropMenuContext.Provider value={dropMenuState}>
            {children}
        </DropMenuContext.Provider>
    )
}

export const useDropMenu = () => useContext(DropMenuContext);