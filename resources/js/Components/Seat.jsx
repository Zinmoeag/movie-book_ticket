const Seat = ({seat, selected}) => {

    const seatImage = (status, seatType, role, selected) => {
        
        if(seatType === 'normal'){
            if(status === 'avaliable'){
                if(selected){
                    // console.log('dd')
                    return "/images/seat/bookedSeat.png"
                }else{
                    if(role === 'front'){
                        return "/images/seat/availableFrontSeat.png"
                    }
                    if(role === 'mid'){
                        return "/images/seat/availableMidSeat.png"
                    }
                    if(role === 'back'){
                        return "/images/seat/availableBackSeat.png"
                    }
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
                    src={seatImage(seat?.status, seat?.seat_type, seat?.role, selected)}
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