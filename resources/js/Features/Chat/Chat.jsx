import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Message from './Partials/Message';
import { useChat } from '@/Context/Chat/ChatContext';
import '../../../css/scroll.css'

const Chat = ({authUser}) => {

    const {
        data,
        reset,
        setData,
    } = useForm({
        message : ""
    })

    const {
        conservation,
        addMessage,
        initializeConservation,
    } = useChat()
    const {
        props : {
            auth : {user}
        }
    } = usePage();

    console.log(conservation)

    const [fetcheingStatus, setFetcheingStatus] = useState({
        error : null,
        loading : false,
    })


    const chatChannel = window.Echo.private(`chatting.${user?.id}`);

    useEffect(() => {
        chatChannel.listen('.send_message', function (data) {
            addMessage(data.message)
        })
    },[chatChannel])


    const fetchingToken = async () => {
        setFetcheingStatus({
            ...fetcheingStatus,
            loading : true,
        });
        axios.get('/chat/3')
            .then(res => {
                setFetcheingStatus({
                    ...fetcheingStatus,
                    loading : false,
                });

                initializeConservation(res.data.conservation);
            })
    }

    const send = () => {

        axios.post('/chat/admin/3',{
            message : data.message
        }).then(res => {

            reset()
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
                                <div id='message-area' className='px-4 py-2 w-full h-[20rem] flex flex-col-reverse gap-2 overflow-y-scroll scroll'>
                                    {conservation && conservation.map(message => (
                                        <Message
                                        sender={authUser.id === message.sender_id}
                                        message={message.message}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='message-bar' className='flex gap-2 bg-slate-900'>
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