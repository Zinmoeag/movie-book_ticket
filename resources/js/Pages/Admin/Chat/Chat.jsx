import AdminLayout from "@/Layouts/AdminLayout";
import ChatBar from "./Partials/ChatBar";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

const Chat = () => {
    const adminChatChannel = window.Echo.private('chattingAdmin');

    useEffect(() => {
        adminChatChannel.listen('.admin.send.message', function(data){
            console.log(data)
        })
    },[adminChatChannel])
    return (
        <>
        <AdminLayout>
            <div className="text-white">
                <div 
                id="chat-area"
                className="flex flex-col"
                style={{
                    height : 'calc(100vh - 4rem)'
                }}
                >

                    <div id="chat-message" className="flex-1">

                    </div>

                    <ChatBar />

                </div>
            </div>
        </AdminLayout>
        </>
    )
}

export default Chat;