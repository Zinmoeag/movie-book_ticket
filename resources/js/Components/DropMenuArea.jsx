import { DropMenu, useDropMenu } from "@/Context/DropMenu/DropMenu";

const DropMenuArea = () => {
    const {DropMenuChild} = useDropMenu()

    return (
        <>
            <div>
                <DropMenu />
            </div>
        </>
    )
}

export default DropMenuArea;