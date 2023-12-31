import { useState } from "react";
import TicketContainer from "@/Components/TicketContainer";

const useDropMenuState = () => {
    const [isOnScreen, setIsOnScreen] = useState(false);
    const [DropMenuChild, setDropMenuChild] = useState(null);

    const close = () => {
        setIsOnScreen(false)
    }

    const show = () => {
        setIsOnScreen(true)
    }

    const showWithChild = (childElement) => {

        setDropMenuChild(childElement);
        setIsOnScreen(true);

    }


    return {
        DropMenuChild,
        isOnScreen,
        close,
        show,
        showWithChild
    }
}
export default useDropMenuState;