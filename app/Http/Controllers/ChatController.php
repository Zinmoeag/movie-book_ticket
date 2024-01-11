<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Events\AdminSendMessageEvent;
use App\Events\SendMessageEvent;
use App\Models\Message;
use App\Models\User;
use App\Utilities\MessageHandling;
use App\Utilities\ChatHandler;
use Illuminate\Support\Facades\DB;


class ChatController extends Controller
{

    private $messageHandling;
    private $chatHandler;

    public function __construct()
    {
        $this->messageHandling = new MessageHandling();
        $this->chatHandler = new ChatHandler();
    }

    public function index()
    {
        return Inertia::render('Admin/Chat/Chat');
    }

    public function showUserChat (User $user)
    {
        // $this->messageHandling->fetchMessage()

        return response()->json([
            'conservation' => $this->messageHandling->fetchMessages($user->id),
        ]);
    }

    public function chatUser(User $user)
    {

        $recentUser = $this->chatHandler->getRecentUser(auth()->user()->id);

        return Inertia::render('Admin/Chat/Chat',[
            'receiver' => $user,
            'recent_users' => $recentUser,
            'conservation' => $this->messageHandling->fetchMessages($user->id),
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
            'message' => 'required',
            'uuId' => 'required',
        ]);
        
        $message = Message::create([
            'receiver_id' => $user->id,
            'message_id' => $cleanData['uuId'],
            'sender_id' => 1,
            'status' => 'deliever',
            'message' => $cleanData['message']
        ]);

        event(new SendMessageEvent($user->id, $message));

        return response()->json([
            'message' => $message
        ]);
        

    }
}
