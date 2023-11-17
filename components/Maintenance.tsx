import maintenance from "@/public/maintenance.jpg"
import Image from "next/image";

export const Maintenance = () => {
    return (<div className={"flex flex-col justify-center items-center align-middle h-screen text-center"}>
        <Image src={maintenance} alt={"Maintenance"} height={150} className="animate-spin-slow rounded-4xl"/>
        <span className={"font-bold text-2xl text-center"}>This site is under Maintenance, Kindly Check Later</span>
    </div>)
}