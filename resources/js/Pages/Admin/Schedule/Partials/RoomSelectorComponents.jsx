import { useState } from "react";

const RoomSelectorComponenst = ({cinemas, handleSelect, selectedItems}) => {

    const [cinemaMenuShow, setCinemaMenuShow] = useState(null);

    const handleAddRoom = (roomId) => {
        handleSelect(roomId);
    }

    return (
        <>
        <div id="room-form" className="my-6">
            <h3 className="bg-slate-600 my-4 py-2 px-2">Choose Cinema of Room</h3>
            <div className="gap-2 w-full">
                {cinemas?.map(cinema => (
                    <>
                    <div className="w-full">
                        <button
                        type="button"
                        onClick={e => setCinemaMenuShow(cinema.id)}
                        className="bg-slate-900 w-full mb-2 px-4 py-2 text-left text-xl"
                        >
                            {cinema.cinema_name}
                        </button>

                        <ul className={`${cinemaMenuShow === cinema.id ? 'h-[30rem]' : 'h-0 ' } transition-all ease-in-out delay-150 overflow-hidden flex flex-wrap gap-4`}>
                            {cinema?.rooms?.map(room => {
                                return (
                                <>
                                    <div
                                    className={`${selectedItems.indexOf(room.id) < 0 ? 'to-amber-400' : 'to-white' } transition ease-in-out delay-150 flex flex-col justify-between items-center w-[20rem] h-[10rem] rounded-xl overflow-hidden bg-gradient-to-r from-rose-600 to-amber-400`}
                                    >
                                        <div className="bg-white w-full flex items-center justify-center h-[5rem]">
                                            <button
                                            type="button"
                                            className="bg-red-600 hover:bg-red-800 text-xl py-2 px-4 rounded-full"
                                            onClick={e => handleAddRoom(room.id)}
                                            >+</button>
                                        </div>

                                        <div className="flex flex-col items-center justify-center h-[5rem]">
                                            <h3>
                                                {"cinema -"+ room.room_number + " ("+cinema.cinema_name+")"}
                                            </h3>
                                            <h3>{room.room_type} room</h3>
                                        </div>
                                    </div>
                                </>
                            )})}
                        </ul>
                    </div>
                        
                    </>
                ))}
            </div>
        </div>
        </>
    )
}

export default RoomSelectorComponenst;