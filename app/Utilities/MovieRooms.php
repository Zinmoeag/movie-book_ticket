<?php
namespace App\Utilities;


class MovieRooms
{
    private $movieRooms = [];
    public function __construct(private $array){
        $this->make();
    }

    public function make()
    {
        foreach($this->array as $movieRoom)
        {
            $newMovieRoom = [];

            $newMovieRoom['id'] =  $movieRoom->id;
            $newMovieRoom['slug'] = $movieRoom->slug;
            $newMovieRoom['date']  = $movieRoom->date->date;
            $newMovieRoom['time']  = $movieRoom->date->time;

            $newMovieRoom['cinema'] = [
                "id" =>  $movieRoom->room->cinema->id,
                "cinema_name" => $movieRoom->room->cinema->cinema_name,
                "cinema_location" => $movieRoom->room->cinema->cinema_location,
            ];
            
            $newMovieRoom['room']  = [
                "id" => $movieRoom->room->id,
                'room_number' =>  $movieRoom->room->room_number
            ];


            array_push($this->movieRooms, $newMovieRoom);

        }
        return $this;
    }


    public function get(){
        return $this->movieRooms;
    }
}