import Ticket from "@/Components/Ticket";
export * from './DropMenuContent';
import { useDropMenu } from "./DropMenuContent";

export const DropMenu = ({ChildElement}) => {
    const {
        DropMenuChild,
        isOnScreen,
        close
    } = useDropMenu();

    return (
        <div 
        id="confirmation" 
        className={`${isOnScreen ? "translate-x-0" : 'translate-x-full'} transition duration-150 bg-slate-900/80 backdrop-blur-md fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center`}
        >
            <button 
            className="text-red-500 absolute right-4 top-2"
            onClick ={close}
            > Close </button>

            <section className='flex items-center justify-center w-full'>
                {DropMenuChild}
            </section>
        </div>
    )
}
