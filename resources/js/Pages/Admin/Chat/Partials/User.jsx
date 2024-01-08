const User = () => {
    return (
        <>
        <div className="bg-slate-700 rounded-lg mx-2 my-2">
            <div className="w-full flex gap-2 items-center justify-center">

                <img 
                src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" 
                alt=""
                className="w-[4rem] h-[4rem] flex-auto" 
                />

                <div className="w-[15rem] px-2">
                    <h3>Name</h3>
                    <p className="text-sm text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default User;