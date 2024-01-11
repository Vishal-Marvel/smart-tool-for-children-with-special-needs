import Link from "next/link";
import {Button} from "@/components/ui/button";
import {currentProfile} from "@/lib/current-profile";
import CustomSignOutButton from "@/components/Customs/CustomSignOutButton";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;
interface Props{
    userName? :string
}
export const SideBar = async ({userName}:Props) => {
    const user = await currentProfile();
    return (
        <div className={"flex flex-col items-center text-center"}>

            {user.role === MemberRole.USER &&
                <span className={"font-bold text-2xl capitalize text-center"}>Welcome! {user.name}</span>
            }
            {user.role === MemberRole.ADMIN &&
                <span className={"font-bold text-2xl capitalize text-center"}>Game Details of {userName}</span>
            }
            <div className={"m-6 w-full items-center flex flex-col h-[300px] sticky left-2 top-5 justify-evenly"}>

                <Link href={"/dashboard"}>
                    <Button className={"w-full"}>Dashboard</Button>
                </Link>
                {user.role === MemberRole.USER &&
                    <>
                        <Link href={"/tests"}>
                            <Button className={"w-full"}>Tests</Button>
                        </Link>
                        <Link href={"/analysis"}>
                            <Button className={"w-full"}>Analysis</Button>
                        </Link>
                    </>
                }
                <CustomSignOutButton/>
            </div>

        </div>
    )
}