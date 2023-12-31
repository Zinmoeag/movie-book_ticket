import Ticket from "./Ticket";

const TicketContainer = () => {
    return (
        <section className="bg-white w-[70%] h-[25rem] rounded-lg text-slate-800">
            <div className="flex h-full">
                <div className="info w-[30rem]  h-full py-4 px-4 h-inherit">
                    <h3 className="text-2xl text-green-600 font-bold uppercase">
                        Successfully Booked!
                    </h3>
                    <p>We sent an Mail for the blah blah Booking</p>

                    <ul className="py-4 border-slate-600 border-t-[0.1rem] mt-4">
                        <li>
                            <h3>Booking Id : 12222</h3>
                        </li>
                        <li>
                            <h3>Name : Zin moe Aung</h3>
                        </li>
                        <li>
                            <h3>Phone : +959 772314165</h3>
                        </li>
                    </ul>
                </div>

                <div className="w-full px-6 py-4 bg-blue-950 overflow-auto">
                    <h3 className="text-white text-xl pb-4">Here is Your Tickets</h3>

                    <div className="flex flex-col gap-4">
                        <Ticket />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TicketContainer;