import { Link, Head } from '@inertiajs/react';
import Card from '../Components/Card'
import {useRef, useEffect, useState} from 'react'
import AppLayout from '../Layouts/AppLayout'



export default function Welcome({ auth, movies }) {

    const scrollSectionRef = useRef(null);
    const [scrollInProgress, setScrollInProgress] = useState(false);

    const handleScroll = (event) => {
        if(!scrollInProgress){
            const scrollSection = scrollSectionRef.current;
            const sections  = scrollSection?.children;
            
            const currentSectionIndex = Math.floor(scrollSection.scrollTop /scrollSection.clientHeight);

            let targetSectionIndex;

            
            if (event.deltaY > 0 && currentSectionIndex < sections.length - 1) {
                targetSectionIndex = currentSectionIndex + 1;
            } else if (event.deltaY < 0 && currentSectionIndex > 0) {
                targetSectionIndex = currentSectionIndex - 1;
            } else {
                setScrollInProgress(false);
                return;
            }
        
            const targetSection = sections[targetSectionIndex];

            scrollSection.scrollTo({
              top: targetSection.offsetTop,
              behavior: 'smooth',
            });
    
            setTimeout(() => {
              setScrollInProgress(false);
            }, 1000); 
    
        }  

    }

    return (
        <>

        <AppLayout
        authUser = {auth.user}
        >
            <section 
            id="hero"
            style={{scrollSnapAlign: 'start'}}
            >

                <div className='h-[70vh] flex items-center justify-center flex-col'>
                    <h3 className='text-[5rem] uppercase font-bold text-white text-center'>BOOK YOUR TICKETS</h3>
                    <h3 className='text-[5rem] uppercase font-bold text-orange-400 text-center'>for movie</h3>
                    <p className='text-2xl text-white'>Safe , seciure, reliable ticketing. Your ticket to live entertainment.</p>
                </div>
            </section>

            <section
            id="show"
            style={{scrollSnapAlign: 'start'}}
            >
                <div className='text-white bg-gradient-to-r from-rose-600 to-amber-400 px-20 py-2'>
                    <h3>Welcome to Cinephile</h3>
                    <h3 className='uppercase text-2xl font-bold py-2'>what are you looking for?</h3>

                    <form>
                        <input
                            type='text'
                            className='bg-white w-full border-none text-slate-600 outline-none pt-4 text-lg border-none'
                            placeholder='Searh for a movie'
                        />
                    </form>
                </div>

                <div className='py-2 px-40' >
                    <h3 className='text-2xl text-yellow-400 font-bold uppercase py-4 border-b-2 border-blue-400'>On Theatre</h3>

                    <div className='flex gap-8 items-center justify-center py-6'>

                        {movies.data.map(movie => (

                            <Link
                                href={route('schedule', {slug : movie.slug})}
                            >
                                <Card
                                    key={movie.id}
                                    img = {movie.movie_photo}
                                    title = {movie.movie}
                                    releaseDate  = {movie.release_date}
                                    duration = {movie.duration}
                                />
                            </Link>
                        ))}

                        
                    </div>


                    <div className='pagination mx-auto w-fit py-4 flex gap-2'>
                        {movies.links.map(link => (
                            <Link
                            preserveScroll
                            href={link.url}
                            className={`${link.active ? 'bg-blue-500' : "bg-red-500"} hover:bg-red-800 bg-red-500 px-4 py-2  text-center text-white`}
                            dangerouslySetInnerHTML={{__html: link.label}}
                            >
                            </Link>
                        ))}
                    </div>

                    

                </div>
            </section>
        </AppLayout>

        </>
    );
}
