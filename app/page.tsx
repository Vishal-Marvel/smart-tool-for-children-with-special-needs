"use client"
import Image from 'next/image'
import {MoveRight} from "lucide-react";

import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {useState} from "react";
import Link from "next/link";

import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

import {Button, buttonVariants} from "@/components/ui/button"

import game from "@/public/game.jpg"

export default function Home() {
    const router = useRouter();
    const [Arrow, setArrow] = useState("opacity-0");
    const [Text, setText] = useState("translate-x-1/2");


    return (

        <div>
            <div className={"justify-end flex p-3"}>

                <SignedIn>
                    <Button asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </SignedIn>

                <SignedOut>

                    <SignInButton >
                        <Button className={cn(buttonVariants({variant: "default"}))}>
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
            </div>

            <div className="m-3 p-3 flex items-center text-center w-full flex-col">
                <h1 className={"text-4xl font-bold w-[800px]"}>
                    Smart And Digitised Visual Motorized Integrated Tool for Child With Special Needs
                </h1>
                <div className={"flex flex-row align-middle items-center m-4"}>
                    <div>
                        <p className={"font-2xl p-4 pb-1 text-justify"}>
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
                        <p className={"text-justify p-4 pt-0"}>
                            <br/>
                            <strong> Adaptability</strong>: The tool is likely designed to adapt to the specific needs and abilities of
                            each child, providing a customized and inclusive learning environment.
                            <br/>
                            <strong> Interactive Learning</strong>: Incorporation of interactive elements can make the learning process
                            engaging and enjoyable, fostering the development of both motor and cognitive skills.
                            <br/>
                            <strong> Digital Support</strong>: The use of digital technologies can offer real-time feedback, progress
                            tracking, and potentially connect with other devices or platforms to enhance the overall
                            learning experience.
                            <br/>
                            <strong> Motor Skills Enhancement</strong>: The emphasis on motorized features suggests that the tool may
                            include components or activities aimed at improving fine or gross motor skills, essential
                            for physical development.
                            <br/>
                            <strong> Visual Stimulation</strong>: Visual elements may be designed to stimulate and enhance visual
                            perception, supporting children with visual challenges in their cognitive and sensory
                            development.
                        </p>
                    </div>
                    <Image src={game} alt={"Game"} height={400} width={400} className={"rounded-2xl order-first"}/>
                </div>

            </div>

            {/*<div style={{borderRadius:30,backgroundColor:"white",height:100,width:400,marginLeft:"38%",marginTop:"4%",alignItems:"center", cursor:"pointer",justifyContent:"space-around",display:"flex",transition:"transform", transitionDuration:"6s"}} onClick={()=>{router.push("/dashboard")}} onMouseEnter={()=>{setarrow("flex")}} onMouseLeave={()=>{setarrow("hidden")}} >*/}
            {/*  <MoveRight size={25} className={cn(Arrow)}/>*/}
            {/*  <h1 style={{fontSize:30,fontWeight:"bold",textAlign:'center'}}>Sign up</h1>*/}
            {/*</div>*/}
            <div
                className=" rounded-full bg-indigo-950 text-white h-16 w-64 mx-auto mt-4 flex items-center cursor-pointer space-x-4 transform transition-all duration-600 "
                onClick={() => router.push("/dashboard")}
                onMouseEnter={() => {
                    setArrow("translate-x-4 opacity-100");
                    setText("translate-x-3/4")

                }}
                onMouseLeave={() => {
                    setArrow("translate-x-0 opacity-0")
                    setText("translate-x-1/2")
                }}>
                <MoveRight size={25} className={cn(Arrow, "transition-all duration-300 ease-in-out")}/>
                <h1 className={cn(Text, "transition-all duration-300 ease-in-out text-2xl font-bold text-center ")}>Sign
                    up</h1>
            </div>

        </div>
    )
}
