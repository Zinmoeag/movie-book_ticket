const FormInput = ({label, name, placeholder, onChange, value, error}) => {
    return (
        <>
            <div className='flex flex-col my-2'>
                <div className="flex flex-col gap-2">
                    <label 
                    htmlFor="name" 
                    className='w-[8rem]'>
                        {label}
                    </label>

                    <input 
                    type="text"
                    onChange={onChange}
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    className='w-[20rem] h-8  bg-slate-700 border-none text-slate-00 '
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}
            </div>
        </>
    )
}

export default FormInput;