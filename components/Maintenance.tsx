import maintenance from "@/public/maintenance.jpg"
import Image from "next/image";
import {redirect} from "next/navigation";

export const Maintenance = () => {
    if (!process.env.MAINTENANCE) {
        return redirect("/");
    }
    return (<div className={"flex flex-col justify-center items-center align-middle h-screen text-center"}>
        <Image src={maintenance} alt={"Maintenance"} height={150} className="rounded-[50%] m-3"/>
        <span className={"font-bold text-2xl text-center"}>This site is under Maintenance, Kindly Check Later</span>
    </div>)
}