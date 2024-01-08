import { useState } from "react";

const useChatState = () => {

    const [conservation, setConservation] = useState([]);

    const initializeConservation = (conservation) => {
        setConservation(conservation)
    }

    const addMessage = (message) => {
        setConservation(prev => {
            return [
                message,
                ...prev,
            ]
        })
    }

    return {
        conservation,
        initializeConservation,
        addMessage,
    }

}

export default useChatState;

