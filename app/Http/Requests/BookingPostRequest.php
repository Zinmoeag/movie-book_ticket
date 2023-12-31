<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\isAvaliable;


class BookingPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'seat' => 'required',
            'seat.*.id' => ['required', 'exists:seats,id', new IsAvaliable($this->route('schedule')->slug)]
        ];
    }

    public function messages(): array
    {
        return [
            'seat.required' => 'Choose a seat to book',
        ];
    }
}
