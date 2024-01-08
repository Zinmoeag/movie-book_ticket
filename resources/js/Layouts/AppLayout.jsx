import { Link } from "@inertiajs/react"
import { DropMenuProvider } from "@/Context/DropMenu/DropMenuContent"
import { ChatProvider } from "@/Context/Chat/ChatContext"
import Chat from '@/Features/Chat/Chat';

export default function AppLayout({children, authUser}){
    return (
        <>
        <ChatProvider>
            <DropMenuProvider>
                <section 
                className='bg-slate-800 text-white'
                >
                    <div className='h-[6rem] bg-violet-800 flex items-center px-20'>
                        <Link href="/">
                            <h3 className='text-white uppercase font-bold text-2xl '>
                                Cinephile
                            </h3>
                        </Link>
                    </div>

                    <section className="bg-slate-800">
                        {children}
                    </section>

                    <div className='fixed bottom-4 right-4 flex flex-col gap-2'>
                        <Chat 
                        authUser={authUser}
                        />
                    </div>
                </section>
            </DropMenuProvider>
        </ChatProvider>
        </>
    )
}