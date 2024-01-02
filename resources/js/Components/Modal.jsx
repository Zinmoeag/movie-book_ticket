const Modal = ({children, show, togleModal, close}) => {
    return (
        <>
        <section 
        className={`${show ? 'translate-x-0' : 'translate-x-[100%]' } transition-all duration-200 fixed bg-slate-900 right-0 top-0 bottom-0 z-30 w-[25rem]`}
        >
            <div className="py-6 px-6">  
                <div className="flex justify-end mb-10">
                    <button
                    className=" hover:text-red-600"
                    onClick={close}
                    >
                            close
                    </button>
                </div>    
                <div className="">
                    {children}
                </div>
            </div>
        </section>
        </>
    )
}

export default Modal;