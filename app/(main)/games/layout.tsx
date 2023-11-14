import React from "react";
import {SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";
import {cn} from "@/lib/utils";

const GameLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={"flex flex-col"}>

        <div className=" flex items-center justify-center">
                {children}
            </div>

        </div>

    );
}

export default GameLayout;