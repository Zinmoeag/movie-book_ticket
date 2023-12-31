<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    
    public function Index()
    {
        return Inertia::render('Admin/Movie/Create', [
            'dd' => 'dd'
        ]);
    }
}
