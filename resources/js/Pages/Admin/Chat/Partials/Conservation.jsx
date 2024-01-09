import { useEffect } from "react";
import ChatBar from "./ChatBar";
import { useChat } from "@/Context/Chat/ChatContext";
import Message from "@/Features/Chat/Partials/Message";
import { usePage } from "@inertiajs/react";
import '../../../../../css/scroll.css'

const Conservation = ({receiver, conservationData}) => {


    const {
        conservation,
        addMessage,
        addDelieverMessage,
        initializeConservation,
    } = useChat()

    const {
        props : {
            auth : {user}
        }
    } = usePage()

    const adminChatChannel = window.Echo.private(`chatting.admin`);

    useEffect(() => {
        adminChatChannel.listen('.admin_send_message', function(data){
            addMessage(data.message.message_id,{...data.message})
        })
    },[adminChatChannel])

    console.log(Object.keys(conservation).length)



    useEffect(() => {
        initializeConservation(conservationData)
    },[conservationData])

    return (
        <>
        <div 
        id="chat-area"
        className="flex flex-col w-full"
        style={{
            height : 'calc(100vh - 4rem)'
        }}
        >
            {Object.keys(conservation).length > 0 ? (
                <>
                    <div className="h-[5rem] flex items-center gap-2 px-6 bg-slate-950 border-b-2 border-slate-400">    
                        <img 
                        src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" 
                        alt=""
                        className="w-auto h-full py-2" 
                        />
                        <p className="text-xl">{receiver.name}</p>
                    </div>
                    <div id="chat-message" className="flex-1 bg-slate-950">
                        {receiver?.id ? (
                            <>
                                {conservation && Object.entries(conservation).map(([key, message]) => (
                                    <div id='message-area' 
                                    className='px-2 py-2 w-full h-[20rem] flex flex-col-reverse gap-2 overflow-y-scroll scroll'
                                    style={{
                                        height : 'calc(100vh - 14rem)'
                                    }}
                                    >
                                        <Message
                                        key={key}
                                        sender={user.id === message.sender_id}
                                        message={message}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="py-6">
                                <h3 className="text-center text-2xl text-slate-600">Please Select Conservation</h3>
                            </div>
                        )}
                    </div>

                    <ChatBar
                    receiver_id={receiver?.id}
                    sender_id={user.id}
                    />
                </>
            ) : (
                <>
                    <div className="bg-slate-950 h-full text-slate-700 flex items-center justify-center">

                        <h3 className="text-center text-xl">
                            Select Conservation
                        </h3>
                    </div>
                </>
            )}

        </div>
        </>
    )
}

export default Conservation;