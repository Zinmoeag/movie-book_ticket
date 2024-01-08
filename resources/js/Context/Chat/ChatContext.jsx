import { useContext, createContext } from "react";
import useChatState from "./useChatState";

const ChatContext = createContext(null)

export const ChatProvider = ({children}) => {

    const chatState = useChatState();
    
    return (
        <ChatContext.Provider value = {{...chatState}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext);