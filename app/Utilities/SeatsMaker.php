<?php

namespace App\Utilities;

class SeatsMaker
{

    public function __construct(private $seats)
    {

    }

    public function make()
    {

       return $this->seats->groupBy('seat_type')->map(function ($type) {
            return $type->groupBy('row')
                ->map(function ($row){
                    return $this->getSeatsByObj($row);
                });
        });
    }

    public function availableSeat()
    {
        return $this->seats->where('status','avaliable')->count();
    }

    public function getSeatsByObj($seats = null)
    {
        $seatsObj = [];
        
        $seatsArray = $seats ? $seats->toArray() : $this->seats->toArray();

        $role = '';


        $result = [];

        foreach($seatsArray as $seat)
        {
            $key = $seat['id'];
            $result[$key] = $seat;

            $role = $seat['role'];
        }

        $seatsObj['seats'] = $result;
        $seatsObj['role'] = $role;

        return $seatsObj;
    }

    public function get()
    {
        return $this->seats;
    }

}
