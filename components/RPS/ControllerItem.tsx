import Image from "next/image";
import {cn} from "@/lib/utils";

type ControllerItemProps = {
    path: string;
    click: () => void;
    disabled: boolean
};

function ControllerItem({path, click, disabled}: ControllerItemProps) {
    return (
        <div className={"relative"}>
            <div className={
                cn("sm:w-[120px] sm:h-[120px] absolute top-0 left-0 w-full h-full rounded-[50%]",
                    disabled ? "bg-black opacity-30" : "cursor-pointer ")}
                 onClick={click}></div>
            <Image
                src={path}
                width={100}
                height={100}
                alt="control"
                className=" sm:w-[120px] sm:h-[120px] "
            />

        </div>
    );
}

export default ControllerItem;
