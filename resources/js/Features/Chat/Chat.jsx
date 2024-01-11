import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { useChat } from '@/Context/Chat/ChatContext';
import '../../../css/scroll.css'
import Conservation from './Partials/Conservation';
import MessageBar from './Partials/MessageBar';
import { Link } from '@inertiajs/react';


const Chat = ({authUser}) => {

    const {
        conservation,
        addMessage,
    } = useChat()

    console.log(conservation)

    const [isOpen , setIsOpen] = useState(false);

    const handleOpenChat = () => {
        setIsOpen(prev => !prev)
    }


    const [fetcheingStatus, setFetcheingStatus] = useState({
        error : null,
        loading : false,
    })


    const chatChannel = window.Echo.private(`chatting.${authUser?.id}`);

    useEffect(() => {
        chatChannel.listen('.send_message', function (data) {
            addMessage(data.message.message_id,{...data.message})
        })
    },[chatChannel])

    return (
        <>
            {
                isOpen && (
                    <div 
                    id='chat'
                    className='w-[20rem] h-[25rem] bg-slate-700 overflow-hidden rounded-lg'
                    >  
                        {authUser ? (
                            <div className='flex flex-col'>
                                {fetcheingStatus.loading && (
                                    <p>Creating Chatting Session</p>
                                )}
                                <Conservation
                                conservation = {conservation}
                                authUser = {authUser}
                                fetcheingStatus = {fetcheingStatus}
                                setFetcheingStatus = {setFetcheingStatus}
                                />
                                <MessageBar 
                                authUser = {authUser}
                                />
                            </div>
                        ) : (
                            <div className='px-6 py-6'>
                                <p>
                                    You need to  <Link className='text-blue-600' href='/login'>login</Link> or <Link className='text-blue-600' href='/register'>Register</Link> first to acess this feature
                                </p>
                               
                            </div>
                        )}
                    </div>
                )
            }

            <button
            onClick={handleOpenChat}
            className='self-end text-white text-2xl bg-slate-700 hover:bg-slate-900 w-[4rem] h-[4rem] text-slate-800 rounded-full flex items-center justify-center'>
                <FontAwesomeIcon 
                icon={faComments} 
                />
            </button>
        </>
    )
}

export default Chat;