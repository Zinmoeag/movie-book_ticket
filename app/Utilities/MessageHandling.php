<?php

namespace App\Utilities;

class MessageHandling
{
    public function getMessage($messsages)
    {
        return $messsages->map(function ($message) {
            return $this->makeMessageArray($message, 'delievered');
        });
    }

    public function makeMessageArray($message, $uniqueToken, $status){
        return [
            'id' => $message->id,
            'receiver_id' => $message->receiver_id,
            'message_id' => $uniqueToken,
            'sender_id' => $message->sender_id,
            'message' => $message->message,
            'status' => $status
        ];
    }
}