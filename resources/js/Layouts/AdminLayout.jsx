import { Link } from "@inertiajs/react"
import MenuDropDown from "@/Components/MenuDropDown"

export default function AdminLayout({children}){
    return (
        <div className="dashboard flex flex-col h-screen" >
                <div className='h-[4rem] bg-blue-950 flex items-center px-20 shadow-md'>
                    <Link href="/">
                        <h3 className='text-yellow-400 uppercase font-bold text-2xl '>
                            Cinephile
                        </h3>
                    </Link>
                </div>

                <div className="flex-auto bg-slate-800">
                    <div 
                    id='dashboard-side-menu'
                    className="bg-blue-950 fixed left-0 h-screen w-[13rem]"
                    >  

                        <div className="py-2">


    
                            <ul className="text-yellow-200 text-sm">
                                <li className="text-white uppercase py-2 text-left px-2 font-bold text-xl">
                                    <Link 
                                    href="/admin"
                                    className="hover:text-yellow-400"
                                    >
                                        DashBoard
                                    </Link>
                                </li>
                                <li className="">
                                    <MenuDropDown 
                                        menu = {[
                                            {id:1,name: "All Movie", link : route('admin.movie')},
                                            {id:2,name: "Create Movie", link : route('admin.movie.create')},
                                            {id:3,name: "Edit Movie", link : route('admin.movie.edit.all')},
                                        ]}
                                        display={"Movies"}
                                    />
                                </li>

                                <li className="">
                                    <MenuDropDown 
                                        menu = {[
                                            {id:1,name: "New Schedule", link : route('admin.schedule.create')},
                                            {id:2,name: "Schedules", link : route('admin.schedule')},
                                        ]}
                                        display={"Schedule"}
                                    />
                                </li>

                                
                                <li className="">
                                    <MenuDropDown 
                                        menu = {[
                                            {id:1,name: "Booking", link : route('admin.booking')},
                                        ]}
                                        display={"Booking"}
                                    />
                                </li>

                                <li className="">
                                    <MenuDropDown 
                                        menu = {[
                                            {id:1,name: "New Cinema", link : route('admin.cinema.create')},
                                            {id:2,name: "New Room", link : route('admin.room.create')}
                                        ]}
                                        display={"Cinema"}
                                    />
                                </li>

                                
                                <li className="">
                                    <MenuDropDown 
                                        menu = {[
                                            {id:1,name: "Chats", link : route('admin.chat')},
                                        ]}
                                        display={"Chat"}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                     className="ms-[13rem] overflow-auto"
                     style = {{
                        height : 'calc(100vh - 4rem)',
                     }}
                     >
                        {children}
                    </div>

                </div>

        </div>
    )
}