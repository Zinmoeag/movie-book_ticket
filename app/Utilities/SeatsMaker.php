<?php

namespace App\Utilities;

class SeatsMaker
{

    public function __construct(private $seats)
    {

    }

    public function make()
    {

        // dd($this->seats);
        return [
            'numberOfSeats' => $this->seats->count(),
            'available_seats' => $this->availableSeat(),
            "seats" => $this->seats->groupBy('seat_type')->map(function ($type) {
                return $type->groupBy('row');
            }),
        ];
    }

    public function availableSeat()
    {
        return $this->seats->where('status','avaliable')->count();
    }

    public function getSeatsByObj()
    {
        $seatsArray = $this->seats->toArray();

        $result = [];

        foreach($seatsArray as $seat)
        {
            $key = $seat['id'];
            $result[$key] = $seat;
        }

        return $result;
    }

    public function get()
    {
        return $this->seats;
    }
}
