import SeatLayoutGenerator from "@/Utilities/seatLayoutGenerator";
import SeatZone from "./SeatZone";

const RoomSeat = ({roomSeats, room}) => {

    let roomLayout = SeatLayoutGenerator(room.room_type);

    // console.log(ro)

    return (
        <>
            <div className="flex flex-col items-center gap-4">
                {Object.entries(roomSeats).map(([key, value]) => (
                    //normal || couple
                    <div className="flex flex-col items-center gap-4">

                        {Object.entries(value).map(([row, seats], i) => {
                            //row of each type
                            return (
                            <ul className='flex'>
                                <span  className='px-4 text-green-400'>{row}</span>
                                <li>
                                    <SeatZone
                                        rowLayout = {roomLayout[key]?.layout[i] || []}
                                        seatRow = {seats}
                                    />
                                </li>
                                <span  className='px-4 text-green-400'>{row}</span>
                            </ul>
                        )})}
                    </div>
                ))}
            </div>
        </>
    )
}

export default RoomSeat;