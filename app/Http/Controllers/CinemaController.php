<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cinema;

class CinemaController extends Controller
{
    public function create(){
        return Inertia::render('Admin/Cinema/Create');
    }

    public function store()
    {
        $cleanData = request()->all();

        $cinema = Cinema::create([
            'cinema_name' => $cleanData['ciname_name'],
            'cinema_location' => $cleanData['cinema_location'],
        ]);

    }
}
