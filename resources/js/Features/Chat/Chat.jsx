import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Message from './Partials/Message';
import { useChat } from '@/Context/Chat/ChatContext';
import '../../../css/scroll.css'
import { divide } from 'lodash';

const Chat = ({authUser}) => {

    const {
        data,
        reset,
        setData,
        post,
    } = useForm({
        message : "",
        uuId : '',
    })

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
    } = usePage();

    const [fetcheingStatus, setFetcheingStatus] = useState({
        error : null,
        loading : false,
    })

    // console.log(conservation)


    const chatChannel = window.Echo.private(`chatting.${authUser?.id}`);

    useEffect(() => {
        chatChannel.listen('.send_message', function (data) {
            // console.log(data)
            addMessage(data.message)
        })
    },[chatChannel])

    //generate message id
    useEffect(() => {
        const uuId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        setData('uuId', uuId)

        return () => {
            reset()
        }
    },[data.message])


    const fetchingToken = async () => {
        setFetcheingStatus({
            ...fetcheingStatus,
            loading : true,
        });
        axios.get('/chat/2')
            .then(res => {
                setFetcheingStatus({
                    ...fetcheingStatus,
                    loading : false,
                });

                initializeConservation(res.data.conservation);
            })
    }

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
        

        axios.post(`/chat/admin/${authUser.id}`,{...data})
            .then(res => {
                reset();
                addDelieverMessage(res.data.message)
            })
    }

    return (
        <>
            <div 
            id='chat'
            className='w-[20rem] h-[25rem] bg-slate-700 overflow-hidden rounded-lg flex  flex-col'
            >
                <div className='h-full'>
                    {fetcheingStatus.loading && (
                        <p>Creating Chatting Session</p>
                    )}

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
            </div>


            <button
            onClick={fetchingToken}
            className='self-end text-white text-2xl bg-slate-700 hover:bg-slate-900 w-[4rem] h-[4rem] text-slate-800 rounded-full flex items-center justify-center'>
                <FontAwesomeIcon 
                icon={faComments} 
                />
            </button>
        </>
    )
}

export default Chat;