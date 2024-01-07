import Link from "next/link";
import {Button} from "@/components/ui/button";
import {currentProfile} from "@/lib/current-profile";
import CustomSignOutButton from "@/components/Customs/CustomSignOutButton";

export const SideBar = async () => {
    const user = await currentProfile();
    return (
    <div className={"flex flex-col items-center "}>

        <div className={"m-6 w-full items-center flex flex-col h-[300px] sticky left-2 top-2 justify-evenly"}>

            <Link href={"/dashboard"} >
                <Button className={"w-full"}>Dashboard</Button>
            </Link>
            <Link href={"/tests"} >
                <Button className={"w-full"}>Tests</Button>
            </Link>
            <Link  href={"/analysis/"+user.id}>
                <Button className={"w-full"}>Analysis</Button>
            </Link>
            <CustomSignOutButton/>
        </div>

    </div>
    )
}