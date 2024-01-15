import AppLayout from '../Layouts/AppLayout'
import '../../css/ticket.css'
import FilterDropDown from '@/Components/FilterDropDown';
import { Link, usePage } from '@inertiajs/react';
import Map from '@/Features/Map/Map';


export default function Book ({showEvents, showDates, currentDate, movie}){

    const {props : {auth}} = usePage()

    const getCinemaMarker = (events) => {
       let arr = Array.from(events, (item) => (
           { 
            popup : item.cinema_name,
            location : item.cinema_location.split(",")
            }
       ))
       return arr;
    }

    

    const filter = (array) => {

        const filteredArray = [];

        if(array.length > 0){
    
            array.forEach((item, i) => {
                let isExisted = false;
                let existedCinemaIndex;
    
                for(let i = 0; i < filteredArray.length; i++){
                    if(filteredArray[i].cinema_id === item.cinema.id){        
                        isExisted = true;
                        existedCinemaIndex = i;
                    }
                }
                if(isExisted){
                    let singleEvent = {};
    
                    singleEvent.id = item.id;
                    singleEvent.slug = item.slug;
                    singleEvent.room_id = item.room.id;
                    singleEvent.date = item.date;
                    singleEvent.time = item.time;
                    singleEvent.room_number = item.room.room_number;
    
                    filteredArray[existedCinemaIndex].events.push(singleEvent)
                }else{
                    let cinema = {};
                    let events = [];
                    let singleEvent  = {};
        
                    cinema.id = item.id;
                    cinema.cinema_id  = item.cinema.id;
                    cinema.cinema_name = item.cinema.cinema_name;
                    cinema.cinema_location = item.cinema.cinema_location;
    
                    singleEvent.id = item.id;
                    singleEvent.slug = item.slug;
                    singleEvent.room_id = item.room.id;
                    singleEvent.date = item.date;
                    singleEvent.time = item.time;
                    singleEvent.room_number = item.room.room_number;
    
                    events.push(singleEvent)
    
                    cinema.events = events;
                    filteredArray.push(cinema)
                }
    
            })

        }else{
            return null;
        }

        return filteredArray
     }

    const data = filter(showEvents);

    const cinemaMarkers = getCinemaMarker(data);


    return (
        <>
            <AppLayout
            authUser={auth.user}
            >
                <section className='py-10 w-[80%] mx-auto'>

                    <div>
                        <div className='flex gap-6 my-[2rem]'>
                            <div className='w-[20rem]'>
                                <img src={movie.movie_photo} alt="" />
                            </div>


                            <div className='flex-1'>
                                <h1 className='uppercase text-yellow-400 text-[3rem] font-bold'>{movie.movie}</h1>
                                <p>Release Date - {movie.release_date}</p>
                                <p>Duration - {movie.duration}</p>
                                <p className='my-6 text-justify'>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut cum id mollitia quod asperiores, magni sapiente, beatae ab suscipit assumenda, laboriosam culpa est! Consequatur placeat quasi voluptatem earum voluptatum maiores.
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut cum id mollitia quod asperiores, magni sapiente, beatae ab suscipit assumenda, laboriosam culpa est! Consequatur placeat quasi voluptatem earum voluptatum maiores.
                                </p>


                                <div className='text-xl mt-14 '>
                                    <a 
                                    href="#book"
                                    className='bg-blue-500 hover:bg-blue-800 rounded-full px-10 py-4'
                                    >
                                        Book now
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='flex gap-6 pt-[6rem] mb-[4rem]' id="book">
                        <div id='map' className='w-[20rem] h-[20rem] bg-green-800'>
                            <Map
                            config = {{
                                view : [16.84109629440007, 96.17068098531388],
                                markers : cinemaMarkers,
                            }}
                            />
                        </div>
                        <div id="schedule list" className='flex-1'>
                            <div>
                                <h3 className='text-orange-300 font-bold text-2xl uppercase'>Book Your Ticket Here</h3>
                                <div className='py-2'>
                                
                                <FilterDropDown
                                    display={currentDate}
                                    menu = {showDates}
                                    query
                                    routeName={'schedule'}
                                    path = {{slug : movie.slug}}
                                    parameter='time'
                                    removeAll={true}
                                    
                                />
                                </div>

                            </div>

                            <div className=''>
                                {data ? data.map(item => (
                                    <div className='flex bg-blue-900 px-10 my-4 items-center justify-center'>
                                        <div className='w-[35%] text-lg uppercase'>{item.cinema_name}</div>
                                        <div className='w-[65%] flex gap-4 border-s-[0.1rem] border-dashed border-blue-500 py-6 px-4'>
                                            {item.events.map(event => (

                                                <div key={event.id} className='bg-blue-500 px-4 py-2'>
                                                    <Link href={route('book.seats',{slug : movie.slug})} data={{time:event.time, date:currentDate, roomId : event.room_id}}>
                                                        <p className=''>{event.time}</p>
                                                    </Link>
                                                </div>
                                            ))}
                                            
                                        </div>

                                    </div>
                                )) : (
                                    <div className='h-screen'>
                                        <h3 className='text-center text-slate-400'>There is no Schedule.</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    
                </section>
            </AppLayout>
        </>
    )
}