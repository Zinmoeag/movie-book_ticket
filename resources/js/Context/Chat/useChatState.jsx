import { useState } from "react";

const useChatState = () => {

    const [conservation, setConservation] = useState({});
    // const [pending, setPending] = useState({});

    const initializeConservation = (conservation) => {
        setConservation(conservation)
    }

    console.log(conservation)

    const addMessage = (key, message) => {
        setConservation(prev => {
           return {
                [key]: message,
                ...prev,
            };
        })
    }

    const addDelieverMessage = (message) => {
        setConservation(prev => {
           return {
                ...prev,
                [message.message_id]: message,
            };
        })
    }

    return {
        conservation,
        initializeConservation,
        addMessage,
        addDelieverMessage,
    }

}

export default useChatState;

