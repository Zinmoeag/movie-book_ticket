import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { useChat } from "@/Context/Chat/ChatContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


const MessageBar = ({authUser}) => {

    const {
        data,
        reset,
        setData,
    } = useForm({
        message : "",
        uuId : '',
    })

    const {
        addMessage,
        addDelieverMessage,
    } = useChat()

    //generate message id
    useEffect(() => {
        const uuId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        setData('uuId', uuId)

        return () => {
            reset()
        }
    },[data.message])

    const send = (e) => {
        e.preventDefault();

        addMessage(data.uuId, {
            id : '',
            receiver_id : 1,
            sender_id : authUser.id,
            message_id : data.uuId,
            message : data.message,
            status : 'send'
        })

        reset()
        
        axios.post(`/chat/admin/${authUser.id}`,{...data})
            .then(res => {
                reset();
                addDelieverMessage(res.data.message)
            })
    }

    return (
        <>
            <div id='message-bar'>
                <form 
                action=""
                onSubmit={send}
                >
                    <div className='flex gap-2 bg-slate-900'>
                        <input 
                        type="text"
                        placeholder='Send Message ...'
                        className='h-[2rem] flex-1 bg-transparent border-none outline-none' 
                        onChange={e => setData('message', e.target.value)}
                        value = {data.message}
                        />
                        <button 
                        className='px-6'
                        onClick={send}
                        >
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default MessageBar;