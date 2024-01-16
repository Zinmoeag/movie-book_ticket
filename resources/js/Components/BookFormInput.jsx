const BookFormInput = ({label, name, placeholder, onChange, value, error}) => {
    return (
        <>
            <div className='flex flex-col my-2'>
                <div>
                    <label 
                    htmlFor="name" 
                    className='w-[8rem] '>
                        {label}
                    </label>

                    <input
                    autoComplete='off'
                    type="text"
                    onChange={onChange}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    className='w-[20rem] h-8  bg-white/80 text-slate-800 rounded-lg'
                    />
                </div>

                {error && <p className="text-red-950">{error}</p>}
            </div>
        </>
    )
}

export default BookFormInput;