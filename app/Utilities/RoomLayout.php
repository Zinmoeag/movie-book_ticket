<?php


namespace App\Utilities;


class RoomLayout
{
    protected $normalLayout = [
        'row' => 8,
        'seats' => [
            'A' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'B' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'C' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'D' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'E' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'F' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'G' => [
                'seats' => 18,
                'layout' => [4,10,4],
                'seat_type' => 'normal'
            ],
            'H' => [
                'seats' => 6,
                'layout' => [3,3],
                'seat_type' => 'couple'
            ]
        ]
    ];
    protected $smartLayout = [
        'row' => 8,
        'seats' => [
            'A' => [
                'seats' => 14,
                'layout' => [3,8,3],
                'seat_type' => 'normal'
            ],
            'B' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal'
            ],
            'C' => [
                'seats' => 14,
                'layout' => [3,8,3],
                'seat_type' => 'normal'
            ],
            'D' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal'
            ],
            'E' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal'
            ],
            'F' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal'
            ],
            'G' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal'
            ],
            'H' => [
                'seats' => 9,
                'layout' => [3,3,3],
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
        if($type === 'smart'){
            return $this->smartLayout;
        }
    }
}