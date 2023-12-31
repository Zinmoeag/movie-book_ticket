const Seat = ({seat, selected}) => {

    const seatImage = (status, seatType, selected) => {
        
        if(seatType === 'normal'){
            if(status === 'avaliable'){
                if(selected){
                    // console.log('dd')
                    return "/images/seat/bookedSeat.png"
                }else{
                    return "/images/seat/availableSeat.png"
                }
            }
            else if(status === 'booked'){
                return "/images/seat/bookedSeat.png"
            }else if(status === 'bought'){
                return "/images/seat/boughtSeat.png"
            }
        }else if(seatType === 'couple'){
            if(status === 'avaliable'){
                if(selected){
                    return "/images/seat/bookedCoupleSeat.png"
                }else{
                    return "/images/seat/avaliableCoupleSeat.png"
                }
            }else if(status === 'booked'){
                return "/images/seat/bookedCoupleSeat.png"
            }else if(status === 'bought'){
                return "/images/seat/boughtCoupleSeat.png"
            }
        }
    }
    
    return (
        <>
            <li className=''>
                                                
                <div className="h-[50px] flex flex-col items-center justify-center">
                    
                    <img 
                    className="h-[40px]"
                    src={seatImage(seat?.status, seat?.seat_type, selected)}
                    alt="" 
                    />
                    <p>
                        {seat?.row + seat?.seat_number}
                    </p>
                </div>
                
            </li>
        </>
    )
}
export default Seat;