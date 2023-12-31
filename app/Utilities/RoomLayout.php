<?php


namespace App\Utilities;


class RoomLayout
{
    protected $normalLayout = [
        'row' => 8,
        'seats' => [
            'A' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'B' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'C' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'D' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'E' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'F' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'G' => [
                'seats' => 18,
                'layout' => [4,3,4],
                'seat_type' => 'normal'
            ],
            'H' => [
                'seats' => 6,
                'layout' => [3,3],
                'seat_type' => 'couple'
            ]
        ]
    ];
    protected $alphaV = ['A','B','C','D','E','F','G','H'];


    protected function getLayout($type)
    {
        if($type === 'normal'){
            return $this->normalLayout;
        }
    }
}