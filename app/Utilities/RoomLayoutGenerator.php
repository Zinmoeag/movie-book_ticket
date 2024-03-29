<?php


namespace App\Utilities;

use App\Utilities\RoomLayout;
use App\Models\Seat;


class RoomLayoutGenerator extends RoomLayout
{

    private $type;
    private $layout;
    private $room;
    private $scheduleId;

    public function __construct($type, $scheduleId)
    {
        $this->type = $type;
        $this->scheduleId = $scheduleId;

        //set room by type
        $this->room = $this->getLayout($type);
    }

    public function get()
    {

        foreach($this->room['seats'] as $rowNo => $row)
        {

            foreach(range(1, $row['seats']) as $seatNo){
                Seat::create([
                    'schedule_id' => $this->scheduleId,
                    'seat_type' => $row['seat_type'],
                    'row' => $rowNo,
                    'role' => $row['role'],
                    'status' => 3,
                    'seat_number' => $seatNo ,
                ]);
            }
            
        }
        return $this->room;
    }

}