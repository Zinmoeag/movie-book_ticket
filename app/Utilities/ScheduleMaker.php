<?php

namespace App\Utilities;

use App\Models\Movie;
use App\Models\Date;
use App\Models\Seat;
use App\Models\Room;
use App\Models\Schedule;
use Illuminate\Support\Str;
use App\Utilities\RoomLayoutGenerator;



class ScheduleMaker
{
    public function getExistedDate($date, $time)
    {
        return  Date::where(function($query) use($date, $time) {
            $query->where('date', $date)
                ->where('time' , $time);
        })->first();
    }

    public function createDate($date, $time)
    {
        return Date::create([
            'date' => $date,
            'time' => $time,
        ]);
    }

    public function createSchedule($data)
    {

        $existedDate = $this->getExistedDate($data["date"], $data['time']);

        if($existedDate){
            $this->createScheduleSeat(
                $data['movie_id'], 
                $existedDate->id, 
                $data["room_id"]
            );
        }else{
            $newDate = $this->createDate($date['date'], $date['time']);

            $this->createScheduleSeat(
                $data['movie_id'], 
                $newDate->id, 
                $data["room_id"]
            );
        }
    }

    public function updateDate($schedule, $date, $time)
    {
        $existedDate = $this->getExistedDate($date, $time);

        if($existedDate){
            $schedule->update([
                'date_id' => $existedDate->id,
            ]);
        }else{
            $newDate = $this->createDate($date, $time);

            $schedule->update([
                'date_id' => $newDate->id,
            ]);

        }
    }




    public function createScheduleSeat($movieId, $dateId, $roomIds)
    {
        $rooms = Room::whereIn('id' , $roomIds)->get()->toArray();

        foreach($rooms as $room)
        {
            $slug = Str::random(20);
            
                $schedule = Schedule::create([
                    'slug' =>  $slug,
                    'movie_id' => $movieId,
                    'date_id' => $dateId,
                    'room_id' => $room['id'],
                ]);
            
                $newSchedule = new RoomLayoutGenerator($room['room_type'], $schedule->id);
                $newSchedule->get();
            }

    }


    public function getScheduleByDate($date)
    {
        return Schedule::whereHas('date',function($query) use($date){
            $query->where('date', $date);
        })->with(['date','room' => fn($query) => $query->with(['cinema'])])->get(); 
    }


}