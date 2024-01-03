import FormDateInput from "@/Components/FormDateInput";


const DateTimeForm = ({data, setData} ) => {
    
    return (
        <div className="flex items-end gap-2">
            <FormDateInput
            label="Date"
            id='date'
            value = {data.date}
            onChange={e => setData('date', e.target.value)}
            error={null}
            />


            <input
            onChange={e => setData('time', e.target.value)}
            value={data.time}
            type="time"
            className="bg-transparent h-fit my-2"
            />
        </div>
    )
}

export default DateTimeForm;