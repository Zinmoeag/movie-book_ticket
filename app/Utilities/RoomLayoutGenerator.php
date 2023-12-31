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

            Seat::factory($row['seats'])->create([
                'schedule_id' => $this->scheduleId,
                'seat_type' => $row['seat_type'],
                'row' => $rowNo,
                'status' => 3,
            ]);
            
        }
        return $this->room;
    }

}