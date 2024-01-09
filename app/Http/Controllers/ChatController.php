<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\AdminSendMessageEvent;
use App\Events\SendMessageEvent;
use App\Models\Message;
use App\Models\User;
use App\Utilities\MessageHandling;


class ChatController extends Controller
{

    private $messageHandling;

    public function __construct()
    {
        $this->messageHandling = new MessageHandling();
    }

    public function index()
    {
        return Inertia::render('Admin/Chat/Chat');
    }

    public function showUserChat (User $user)
    {

        $message = Message::where(function($query) use($user) {
            $query->where('sender_id', $user->id)
                  ->orWhere('receiver_id', $user->id);
        })
        ->latest()
        ->limit(10)
        ->get();

        // dd($message);

        // dd($this->messageHandling->makeMessageArray($message,'deliever'));

        return response()->json([
            'conservation' => $this->messageHandling->getMessage($message),
            'message' => $message
        ]);
    }

    public function chatUser(User $user)
    {
        return Inertia::render('Admin/Chat/Chat',[
            'user_id' => $user->id
        ]);
    }

    public function userSend($sender)
    {
        $cleanData = request()->validate([
            'message' => 'required',
            'uuId' => 'required',
        ]);


        //store in db
        $message = Message::create([
            'receiver_id' => 1,
            'sender_id' => auth()->user()->id,
            'message_id' => $cleanData['uuId'],
            'message' => $cleanData['message'],
            'status' => 'deliever'
        ]);

        //send message deliever event
        event(new AdminSendMessageEvent($message, $sender));

        return response()->json([
            'message' => $message
        ]);
        
        // event(new SendMessageEvent( $sender,$message, ));

    }

    public function adminSend(User $user)
    {
        $cleanData = request()->validate([
            'message' => 'required'
        ]);
        
        $message = Message::create([
            'receiver_id' => $user->id,
            'sender_id' => 1,
            'message' => $cleanData['message']
        ]);

        event(new SendMessageEvent(3, $message));

    }
}
