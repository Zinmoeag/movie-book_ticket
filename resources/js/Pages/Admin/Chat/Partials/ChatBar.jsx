const ChatBar = () => {
    return (
        <>
        <div className="h-fit flex py-2 px-2 bg-slate-900">
            <input 
            type="text"
            className="w-full bg-transparent border-none outline-none"
            placeholder="Send Message" 
            />
            <button
            className="bg-slate-950 px-6 py-2 "
            >
                Send
            </button>
        </div>
        </>
    )
}

export default ChatBar;