import { Link } from "@inertiajs/react"
import { DropMenuProvider } from "@/Context/DropMenu/DropMenuContent"
import { ChatProvider } from "@/Context/Chat/ChatContext"
import Chat from '@/Features/Chat/Chat';
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import { useState } from "react";
import Footer from "@/Components/Footer";

export default function AppLayout({children, authUser}){

    const [LoginOrRegister, setLoginOrRegister] = useState(null)

    return (
        <>
        <ChatProvider>
            <DropMenuProvider>
                <section 
                className='bg-slate-800 text-white'
                >
                    <div className='h-[6rem] bg-blue-900 flex items-center justify-between px-20'>
                        <Link href="/">
                            <h3 className='text-white uppercase font-bold text-2xl '>
                                Cinephile
                            </h3>
                        </Link>

                        {!authUser && (
                            <div className="flex gap-2">
                                <button
                                onClick={e => setLoginOrRegister('login')}
                                >
                                    Login
                                </button>

                                <span>
                                    |
                                </span>

                                <button
                                onClick={e => setLoginOrRegister('register')}
                                >
                                    Register
                                </button>
                            </div>
                        )}

                    </div>

                    <section className="bg-slate-800">
                        {children}
                    </section>

                    <div className='fixed bottom-4 right-4 flex flex-col gap-2'>
                        <Chat 
                        authUser={authUser}
                        />
                    </div>

                    <Footer />

                    <div className={`${LoginOrRegister === 'login' ? 'translate-x-0' : 'translate-x-[-200%]' } fixed top-0 left-0 right-0 bottom-0 transition-all duration-200`}>
                        <Login
                        setIsClose = {e => setLoginOrRegister(null)}
                        canRegister = {true}
                        />
                    </div>

                    <div className={`${LoginOrRegister === 'register' ? 'translate-x-0' : 'translate-x-[-200%]' } fixed top-0 left-0 right-0 bottom-0 transition-all duration-200`}>
                        <Register
                        setIsClose = {e => setLoginOrRegister(null)} 
                        />
                    </div>

                </section>
            </DropMenuProvider>
        </ChatProvider>
        </>
    )
}