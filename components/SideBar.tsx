"use client"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {currentProfile} from "@/lib/current-profile";
import CustomSignOutButton from "@/components/Customs/CustomSignOutButton";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;
import {MobileToggle} from "@/components/MobileToggle";
import {useEffect, useState} from "react";
import {Users} from "@prisma/client";
import {StartGameButton} from "@/components/StartGameButton";

interface Props {
    userName?: string
    user:Users
}

export const SideBar = ({userName, user}: Props) => {
    const [title, setTitle] = useState("");
    useEffect(()=>{


        if (user.role === MemberRole.USER){
            setTitle("Welcome! "+ user.name);
        }else if (user.role === MemberRole.ADMIN && userName){
            setTitle("Game Details Of "+userName);
        }


    }, [user]);



    return (
        <div>
            <div className={"md:hidden md:m-2 md:p-2 relative"}>
                    <MobileToggle title={title} user={user}/>

            </div>
            <div className={"hidden md:flex flex-col items-center text-center  sticky left-2 top-5"}>

                    <span className={"font-bold text-2xl capitalize text-center"}>{title}</span>
                <div
                    className={"m-6 w-full items-center flex flex-col h-[400px] justify-evenly"}>

                    <Link href={"/dashboard"}>
                        <Button  className={"w-[150px]"}>Dashboard</Button>
                    </Link>
                    {user && user.role === MemberRole.USER &&
                        <>
                            <StartGameButton/>

                            <Link href={"/tests"}>
                                <Button className={"w-[150px]"}>Tests</Button>
                            </Link>
                            <Link href={"/analysis"}>
                                <Button  className={"w-[150px]"}>Analysis</Button>
                            </Link>
                        </>
                    }
                    <CustomSignOutButton />
                </div>

            </div>

        </div>
    )
}