import { useForm, usePage } from "@inertiajs/react"
import axios from "axios";
import { useEffect } from "react";
import { useChat } from "@/Context/Chat/ChatContext";

const ChatBar = ({receiver_id, sender_id}) => {

    const {
        data,
        setData,
        reset
    } = useForm({
        message : '',
        uuId : '',
    })

    const {
        conservation,
        addMessage,
        addDelieverMessage,
    } = useChat()

    const send = (e) => {
        e.preventDefault();

        addMessage(data.uuId, {
            id : '',
            receiver_id : receiver_id,
            sender_id : sender_id,
            message_id : data.uuId,
            message : data.message,
            status : 'send'
        })

        axios.post(`/admin/chat/${receiver_id}`,{...data})
            .then(res => addDelieverMessage(res.data.message))
        reset()
    }

    //generate message id
    useEffect(() => {
        const uuId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        setData('uuId', uuId)

        return () => {
            reset()
        }
    },[data.message])
    
    return (
        <>
        <div className="h-fit flex py-2 px-2 bg-slate-900">
            <form onSubmit={send} className="w-full">
                <div className="flex w-full">
                    <input 
                    type="text"
                    className="w-full bg-transparent border-none outline-none"
                    placeholder="Send Message"
                    onChange={e => setData('message',e.target.value)}
                    value = {data.message}
                    />
                    
                    <button
                    type="submit"
                    className="bg-slate-950 px-6 py-2 "
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default ChatBar;