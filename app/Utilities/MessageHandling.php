<?php

namespace App\Utilities;

use App\Models\Message;

class MessageHandling
{
   public function getMessage($messages)
    {
        // Convert the collection to an array
        $messagesArray = $messages->toArray();

        // Initialize an empty array to store the result
        $result = [];

        // Map over the array to create the associative arrays
        foreach ($messagesArray as $message) {
            // Use the message_id as the key
            $key = $message['message_id'];
            
            // Create the associative array using the makeMessageArray function
            $result[$key] = $this->makeMessageArray((object) $message);
        }

        return $result;
    }

    public function makeMessageArray($message)
    {
        return [
            'id' => $message->id,
            'receiver_id' => $message->receiver_id,
            'message_id' => $message->message_id,
            'sender_id' => $message->sender_id,
            'message' => $message->message,
            'status' => $message->status,
        ];
    }

    public function fetchMessages($userId)
    {
        $messages = Message::where(function($query) use($userId) {
            $query->where('sender_id', $userId)
                  ->orWhere('receiver_id', $userId);
        })
        ->latest()
        ->limit(40)
        ->get();

        return $this->getMessage($messages);
    }


}