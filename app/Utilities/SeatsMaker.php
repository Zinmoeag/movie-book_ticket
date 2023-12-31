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
            'available_seats' => $this->seats->where('status','avaliable')->count(),
            "seats" => $this->seats->groupBy('seat_type')->map(function ($type) {
                return $type->groupBy('row');
            }),
        ];
    }
}