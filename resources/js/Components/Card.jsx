import {useState} from 'react'


export default function Card({img,title,releaseDate, duration}){
    const [isHover, setIsHover] = useState(false);
    return (
        <div className='card w-fit overflow-hidden bg-gradient-to-r  from-rose-600 to-amber-400 h-fit relative'>

            <div 
            className=' cursr-pointer transition-all duration-75'
            onMouseEnter={e => setIsHover(true)}
            onMouseLeave={e => setIsHover(false)}
            >
                <div className='w-[290px] h-[459px] overflow-hidden'>
                    <img 
                    src={img}
                    className={`${isHover ? "scale-100" : 'scale-105'}`}
                    />
                </div>
            </div>
            <div className='relative w-[290px]'>
                
                <h3 className='bg-slate-200/75 h-[3.5rem] uppercase font-bold px-4 text-xl text-blue-700 flex items-center'>{title}</h3>
                <div className=' h-[4rem] px-4 pt-2 text-slate-200 font-lg bg-red-900 text-sm'>
                    <h4 className=''>Release Date - {releaseDate}</h4>
                    <h4  className=''>Duration - {duration}</h4>

                </div>
            </div>
        </div>
    )
}
