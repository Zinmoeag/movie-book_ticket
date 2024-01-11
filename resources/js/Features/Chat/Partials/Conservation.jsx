import Message from "./Message";
import { useEffect } from "react";
import { useChat } from "@/Context/Chat/ChatContext";

const Conservation = ({conservation, authUser,fetcheingStatus, setFetcheingStatus}) => {

    const {
        resetConservation,
        initializeConservation,
    } = useChat()

    useEffect(() =>{

        fetchingConservation()

        return () => {
            resetConservation()
        }
    },[])

    const fetchingConservation = async () => {
        
        if(authUser){
            setFetcheingStatus({
                ...fetcheingStatus,
                loading : true,
            });
            axios.get(`/chat/${authUser.id}`)
                .then(res => {
                    setFetcheingStatus({
                        ...fetcheingStatus,
                        loading : false,
                    });
    
                    initializeConservation(res.data.conservation);
                })
        }
    }

    

    return (
        <>
            <div className='h-full'>
                <div id="chat-header" className="bg-blue-600 h-[3rem] text-white text-lg flex items-center px-4">
                    Let us Know Your Problem
                </div>

                <div className='h-[20rem] scroll'>
                    <div id='info' className='relative h-full overflow-auto'>
                        <div className='absolute w-full h-full botton-0 flex'>
                            <div id='message-area' className='px-2 py-2 w-full h-[20rem] flex flex-col-reverse gap-2 overflow-y-scroll scroll'>
                                {conservation && Object.entries(conservation).map(([key, message]) => (
                                    <Message
                                    key={key}
                                    sender={authUser.id === message.sender_id}
                                    message={message}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Conservation;

