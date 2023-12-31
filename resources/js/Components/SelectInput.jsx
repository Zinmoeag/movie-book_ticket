const SelectInput = ({label, onChange, defaultSelected, options}) => {
    return (
        <>
            <div id='select' className="flex flex-col">
                <label htmlFor="selectOption" className="text-white py-4">{label}</label>
                <select 
                id="selectOption" 
                className="bg-slate-800 text-white border-none outline-none"
                onChange={e => onChange(e.target.value)}
                >
                    <option value="" className="" disabled selected>
                            {defaultSelected}
                    </option>
                    {options.map(option => (
                        <option value={option.value} className="">
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectInput;