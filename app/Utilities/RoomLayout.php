<?php


namespace App\Utilities;


class RoomLayout
{
    protected $normalLayout = [
        'row' => 8,
        'seats' => [
            'A' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 1,
            ],
            'B' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 1,
            ],
            'C' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 2,
            ],
            'D' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 2,
            ],
            'E' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 2,
            ],
            'F' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 3,
            ],
            'G' => [
                'seats' => 30,
                'layout' => [8,14,8],
                'seat_type' => 'normal',
                'role' => 3,
            ],
            'H' => [
                'seats' => 6,
                'layout' => [3,3],
                'seat_type' => 'couple',
                'role' => 4,
            ]
        ]
    ];
    protected $smartLayout = [
        'row' => 8,
        'seats' => [
            'A' => [
                'seats' => 14,
                'layout' => [3,8,3],
                'seat_type' => 'normal',
                'role' => 1,
            ],
            'B' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal',
                'role' => 1,
            ],
            'C' => [
                'seats' => 14,
                'layout' => [3,8,3],
                'seat_type' => 'normal',
                'role' => 2,
                
            ],
            'D' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal',
                'role' => 2,
            ],
            'E' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal',
                'role' => 2,
            ],
            'F' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal',
                'role' => 3,
            ],
            'G' => [
                'seats' => 20,
                'layout' => [4,12,4],
                'seat_type' => 'normal',
                'role' => 3,
                
            ],
            'H' => [
                'seats' => 9,
                'layout' => [3,3,3],
                'seat_type' => 'couple',
                'role' => 4,
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