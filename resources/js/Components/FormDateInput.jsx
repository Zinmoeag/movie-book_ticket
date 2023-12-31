const FormDateInput = ({label, error, id, onChange, value}) => {
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
                    id = {id}
                    onChange={onChange}
                    value={value}
                    className="w-[20rem] bg-slate-700 border-none"
                    type="date" 
                    />
                    
                </div>

                {error && <p className="text-red-500">{error}</p>}
            </div>
        </>
    )
}

export default FormDateInput;