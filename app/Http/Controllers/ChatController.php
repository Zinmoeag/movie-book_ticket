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

        return response()->json([
            'conservation' => $message,
            'message' => 'dd'
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
            'message' => 'required'
        ]);

        //generate token
        $messageId = time() . '_' . rand(1000, 9999);

        // send message event
        $msg = [
            'id' => '',
            'receiver_id' => 1,
            'message_id' => $messageId,
            'sender_id' => $sender,
            'message' => $cleanData['message'],
            'status' => 'send'
        ];

        event(new AdminSendMessageEvent($msg, $sender ));
        //store in db
        //send message deliever event
        

        $message = Message::create([
            'receiver_id' => 1,
            'sender_id' => auth()->user()->id,
            'message_id' => $messageId,
            'message' => $cleanData['message']
        ]);

        event(new SendMessageEvent( $sender,$message, ));



    
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
