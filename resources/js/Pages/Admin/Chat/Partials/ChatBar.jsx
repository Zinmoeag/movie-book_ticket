import { useForm, usePage } from "@inertiajs/react"
import axios from "axios";

const ChatBar = ({userId}) => {
    const {
        data,
        post,
        setData,
        reset
    } = useForm({
        message : '',
    })

    const send = (e) => {
        e.preventDefault();

        post(`/admin/chat/${userId}`)
        reset()
    }
    
    return (
        <>
        <div className="h-fit flex py-2 px-2 bg-slate-900">
            <form onSubmit={send}>
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
            </form>
        </div>
        </>
    )
}

export default ChatBar;