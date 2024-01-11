<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cinema;

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
}
