const SeatLayoutGenerator = (roomType) => {

    if(roomType === 'normal'){
        return {
            normal : {
                layout : [
                    [4,10,4],
                    [4,10,4],
                    [4,10,4],
                    [4,10,4],
                    [4,10,4],
                    [4,10,4],
                    [4,10,4],
                ],
            },
            couple : {
                layout : [
                    [3,3]
                ],
            }
        }
    }else if(roomType === 'smart'){
        return {
            normal : {
                layout : [
                    [3,8,3],
                    [4,12,4],
                    [3,8,3],
                    [4,12,4],
                    [4,12,4],
                    [4,12,4],
                    [4,12,4],
                ],
            },
            couple : {
                layout : [
                    [3,3,3]
                ],
            }
        }
    }
}

export default SeatLayoutGenerator;