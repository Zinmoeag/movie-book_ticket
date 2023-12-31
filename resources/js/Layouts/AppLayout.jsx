import { Link } from "@inertiajs/react"
import { DropMenuProvider } from "@/Context/DropMenu/DropMenuContent"

export default function AppLayout({children}){
    return (
        <>

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
            </section>
        </DropMenuProvider>
        </>
    )
}