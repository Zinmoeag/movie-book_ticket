const Message = ({sender, message}) => {
    const isSender = () => {
        if(sender){
            return 'self-end bg-blue-600';
        }
        return 'self-start bg-slate-600'
    }

    return (
        <>
            <div id='message' className={`text-sm justify-end justify-items-end shadow-md max-w-[15rem] px-2 py-2 rounded-lg ${isSender()}`}>
                <p>{message}</p>
            </div>
        </>
    )
}

export default Message;