import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCheck } from '@fortawesome/free-solid-svg-icons';


const Message = ({sender, message}) => {

    const isSender = () => {
        if(sender){
            return 'self-end';
        }
        return 'self-start'
    }

    const isSenderColor = () => {
        if(sender){
            return 'bg-blue-600';
        }
        return 'bg-slate-600'
    }

    return (
        <>
            <div className={`flex max-w-[15rem] ${isSender()} justify-between items-end gap-1`}>
                <div id='message' className={`text-sm justify-end justify-items-end shadow-md px-2 py-2 rounded-lg ${isSenderColor()}`}>
                    <p>{message.message}</p>
                </div>
                {sender && message.status === "deliever" ? (                
                    <FontAwesomeIcon 
                    icon={faCircleCheck}
                    className='text-[0.6rem]' 
                    />
                ) : (
                    <FontAwesomeIcon 
                    icon={faCheck} 
                    className='text-[0.6rem]'
                    />
                )}
            </div>
        </>
    )
}

export default Message;

