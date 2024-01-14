<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cinema;
use App\Models\Room;

class RoomController extends Controller
{
    public function create()
    {

        $cinema = Cinema::all()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->cinema_name,
                'value' => $item->id,
            ];
        });

        return Inertia::render('Admin/Room/Create',[
            'cinemas' => $cinema,  
        ]);
    }

    public function store()
    {
        $cleanData = request()->validate([
            "room_number" => "required",
            "room_type" => "required",
            'cinema_id' => 'required|numeric',
        ]);

        $roomType = $cleanData['room_type'] === 'normal' ? 1 : 2;
        $total_seats = $cleanData['room_type'] === 'normal' ? 216 : 137;

        Room::create([
            'room_type' => $roomType,
            'room_number' => $cleanData['room_number'],
            'cinema_id' => $cleanData['cinema_id'],
            'total_seats' => $total_seats,
        ]);

        return to_route('admin.schedule');
        
    }
}
