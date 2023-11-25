"use client"
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";

import {SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";

import {Button, buttonVariants} from "@/components/ui/button"
import ToggleButton from "@/components/ToggleButton";
import {GameCard} from "@/components/GameCard";
import memory from "@/public/memory.png";

export default function Home() {
    const router = useRouter();
    const [Arrow, setArrow] = useState("opacity-0");
    const [Text, setText] = useState("translate-x-1/2");


    return (

        <div>
            <div className={"justify-end flex p-3"}>
                <ToggleButton/>
                <SignedIn>
                    <Button asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </SignedIn>

                <SignedOut>

                    <SignInButton>
                        <Button className={cn(buttonVariants({variant: "default"}))}>
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>

            <div className="m-3 flex items-center text-center flex-col">
                <h1 className={"text-2xl md:text-4xl font-bold w-4/5"}>
                    Smart And Digitised Visual Motorized Integrated Tool for Child With Special Needs
                </h1>
                <div className={"flex md:flex-row flex-col align-middle items-center justify-center md:m-4"}>
                    <p className={"font-2xl md:p-4 p-2 pb-1 text-center"}>
                        A "Smart and Digitized Visual Motorized Integrated Tool for Children with Special Needs"
                        refers to an innovative device designed to assist and support children who have special
                        needs, particularly those with motor and visual challenges. This tool incorporates advanced
                        technologies and digital features to provide a tailored and interactive learning or
                        therapeutic experience for these children.

                        The term "visual motorized" suggests that the tool combines visual and motor skills
                        development, addressing challenges related to both perception and physical coordination. The
                        integration of smart technology indicates that the tool likely utilizes digital elements
                        such as sensors, interactive displays, or adaptive software to personalize the experience
                        for each child.
                    </p>
                </div>
            </div>
            <div className={"m-4 p-2"}>
                <span className={"text-2xl font-semibold"}>Games Available</span>

                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"}>

                    <GameCard image={memory}
                              med={"Hand eye coordination."}
                              text={"The objective of the memory game is to find all the matching pairs by clicking on the cards."}
                              name={"Memory Game"}
                    />

                </div>
            </div>


        </div>
    )
}
