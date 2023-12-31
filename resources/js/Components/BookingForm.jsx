import BookFormInput from '@/Components/BookFormInput';
import { useState } from 'react';
import Seat from './Seat';
import { useBooking } from '@/Context/BookingContext/BookingContext';
import { usePage } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const BookingForm = ({action}) => {

    const {
        data,
        setData,
        errors,
        removeSeat,
        submitBooking,
        buy,
    } = useBooking();


    const handleChange = (e) => {
        let key = e.currentTarget.id;
        let value = e.currentTarget.value;

        setData(key, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        submitBooking(action);
    }

    const handleBuy = (e) => {
        e.preventDefault();

        buy(action);
    }
 
    return (
        <div className='flex'>

            <div className='mx-4 my-8'>
                
                    <BookFormInput
                        label = 'Name'
                        onChange={handleChange}
                        value = {data.name}
                        name = 'name'
                        placeholder='Enter Your Name'
                        error = {errors.name}
                    />
                    <BookFormInput
                        label = 'Phone'
                        onChange={handleChange}
                        value = {data.phone}
                        name = 'phone'
                        placeholder='Enter Your Phone Number'
                        error = {errors.phone}
                    />
                    <BookFormInput
                        label = 'Email'
                        onChange={handleChange}
                        value = {data.email}
                        name = 'email'
                        placeholder='Enter Your Email Address'
                        error = {errors.email}
                    />

                <div className='flex gap-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex justify-end'> 
                            <button
                            type='submit'
                            className='bg-red-950 py-2 px-4 rounded-full'
                            >
                                Book Now!
                            </button>
                        </div>
                    </form>

                    <form onSubmit={handleBuy}>
                        <div className='flex justify-end'> 
                            <button
                            type='submit'
                            className='bg-blue-950 py-2 px-4 rounded-full'
                            >
                                Buy Ticket
                            </button>
                        </div>
                    </form>
                </div>

            </div>

            <div className='w-full py-2'>
                <ul className='flex flex-wrap gap-4'>
                    {(data.seat.length > 0) ? data.seat.map(seat => (
                        <li key={seat.id } className='flex justify-between bg-slate-700 rounded-lg overflow-hidden'>
                            <div className=' h-[7rem] w-[7rem] flex items-center justify-center'>
                                <Seat
                                    seat = {seat}
                                />
                            </div>
                            <div className='control bg-white flex flex-col w-8 justify-center'>
                                <button 
                                className='bg-red-700 h-full hover:bg-red-900'
                                onClick={e => removeSeat(seat)}
                                >
                                    <FontAwesomeIcon className='text-white' icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    )) : (
                        <div>
                            <h3 className='text-center'>There is no seat selected</h3>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default BookingForm;