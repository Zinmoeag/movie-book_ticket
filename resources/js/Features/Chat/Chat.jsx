import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments,faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import FormInput from '@/Components/FormInput.';

const Chat = () => {

    const {
        data,
        reset,
        setData,
    } = useForm({
        message : ""
    })

    const [chatToken, setChatToken] = useState(null);
    const [fetcheingStatus, setFetcheingStatus] = useState({
        error : null,
        loading : false,
    })


    const chatChannel = window.Echo.channel(`chatting.${chatToken}`);

    useEffect(() => {
        chatChannel.listen('.send_message', function (data) {
            console.log(data)
        })
    },[chatChannel])

    const fetchingToken = async () => {
        setFetcheingStatus({
            ...fetcheingStatus,
            loading : true,
        });
        axios.get('/api/ii')
            .then(res => {
                setFetcheingStatus({
                    ...fetcheingStatus,
                    loading : false,
                });

                setChatToken(res.data.chat_token)
            })
    }

    const send = () => {
        axios.post('/api/chat/admin',{
            token : chatToken,
            message : data.message
        }).then(res => reset())
    }

    return (
        <>
            <div 
            id='chat'
            className='w-[20rem] h-[25rem] bg-slate-700 overflow-hidden rounded-lg flex flex-col'
            >
                <div className='h-full'>
                    {fetcheingStatus.loading && (
                        <p>Creating Chatting Session</p>
                    )}

                    <div>
                        <div id='info'>
                            <form action="">
                                <FormInput
                                label = 'name'
                                name = 'name'
                                id = 'name'
                                />
                            </form>
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