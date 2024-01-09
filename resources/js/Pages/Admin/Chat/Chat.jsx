import AdminLayout from "@/Layouts/AdminLayout";
import ChatBar from "./Partials/ChatBar";
import { useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import User from "./Partials/User";
import Conservation from "./Partials/Conservation";
import { ChatProvider } from "@/Context/Chat/ChatContext";

const Chat = ({receiver, recent_users, conservation}) => {

    const {props} = usePage();

    return (
        <>
        <AdminLayout>
            <ChatProvider>
                <div className="text-white flex">
                    <Conservation
                    conservationData={conservation}
                    receiver={receiver} 
                    />
                    <div id='chat_users' className="w-[25rem]">
                        {recent_users && recent_users.map(user => (
                            <Link href={`/admin/chat/${user.user_id}`}>
                                <User
                                name={user.name}
                                message = {user.message}
                                />
                            </Link>
                        ))}
                    </div>

                </div>
            </ChatProvider>
        </AdminLayout>
        </>
    )
}

export default Chat;