import AdminLayout from "@/Layouts/AdminLayout";
import ChatBar from "./Partials/ChatBar";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import User from "./Partials/User";

const Chat = ({user_id}) => {
    const {props} = usePage();

    const adminChatChannel = window.Echo.private(`chatting.admin.3`);

    useEffect(() => {
        adminChatChannel.listen('.admin_send_message', function(data){
            console.log(data)
        })
    },[adminChatChannel])

    return (
        <>
        <AdminLayout>
            <div className="text-white flex">
                <div 
                id="chat-area"
                className="flex flex-col w-full"
                style={{
                    height : 'calc(100vh - 4rem)'
                }}
                >
                    <div id="chat-message" className="flex-1 bg-slate-950">

                    </div>

                    <ChatBar
                    userId={user_id} 
                    />

                </div>

                <div id='chat_users' className="w-[25rem]">

                    <User />

                </div>
            </div>
        </AdminLayout>
        </>
    )
}

export default Chat;