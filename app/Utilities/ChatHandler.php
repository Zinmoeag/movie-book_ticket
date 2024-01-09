<?php

namespace App\Utilities;

use Illuminate\Support\Facades\DB;
use App\Models\Message;
use App\Models\User;

class ChatHandler
{
    public function getRecentUser($senderId)
    {
        DB::statement("SET SESSION sql_mode=''");

        $recentMessage = Message::where(function ($query) use($senderId) {
            $query->where('receiver_id', $senderId)
                ->orWhere('sender_id', $senderId);
        })
        ->groupBy('sender_id', 'receiver_id')
        ->select('sender_id', 'receiver_id', 'message', 'message_id', 'status')
        ->orderBy('id', 'desc')
        ->limit(30)
        ->get();

        return $this->getFilterRecentMessages($recentMessage, $senderId);
    }
    
    public function getFilterRecentMessages($recentMessages,  $senderId)
    {
        $recentUsersWithMessage = [];
        $usedUserIds = [];
        foreach ($recentMessages as $message) {
            $userId = $message->sender_id == $senderId ? $message->receiver_id : $message->sender_id;
            if (!in_array($userId, $usedUserIds)) {
                $recentUsersWithMessage[] = [
                    'user_id' => $userId,
                    'message' => $message->message
                ];
                $usedUserIds[] = $userId;
            }
        }

        foreach ($recentUsersWithMessage as $key => $userMessage) {
            $recentUsersWithMessage[$key]['name'] = User::where('id', $userMessage['user_id'])->value('name') ?? '';
        }

        return $recentUsersWithMessage;
    }

}