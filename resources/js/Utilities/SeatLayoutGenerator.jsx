const SeatLayoutGenerator = (roomType) => {

    if(roomType === 'normal'){
        return {
            normal : {
                layout : {
                   A : [8,14,8],
                   B : [8,14,8],
                   C : [8,14,8],
                   D : [8,14,8],
                   E : [8,14,8],
                   F : [8,14,8],
                   G : [8,14,8],
                },
            },
            couple : {
                layout : { 
                   H : [3,3]
                },
            }
        }
    }else if(roomType === 'smart'){
        return {
            normal : {
                layout : {
                    A : [3,8,3],
                    B : [4,12,4],
                    C : [3,8,3],
                    D : [4,12,4],
                    E : [4,12,4],
                    F : [4,12,4],
                    G : [4,12,4],
                },
            },
            couple : {
                layout : {
                    H : [3,3,3]
                },
            }
        }
    }
}

export default SeatLayoutGenerator;