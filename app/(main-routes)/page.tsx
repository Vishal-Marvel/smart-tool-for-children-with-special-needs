
import {cn} from "@/lib/utils";
import Link from "next/link";

import {SignedIn, SignedOut, SignInButton} from "@clerk/nextjs";

import {Button, buttonVariants} from "@/components/ui/button"

export default function Home() {


    return (

        <div>


            <div className="m-3 flex flex-1 items-center text-center flex-col text-indigo-950 dark:text-indigo-50 justify-evenly">
                <h1 className={"text-2xl md:text-4xl font-bold w-4/5 font-sans"}>
                    Smart And Digitised Visual Perception Integrated Tool for Child With Special Needs
                </h1>
                <div className={"flex flex-col align-middle justify-center md:m-4"}>

                    {/*<p className={"text-justify md:p-4 p-2"}>*/}
                        <strong className={"text-[24px] p-2 pl-0"}>DOMAINS TESTED:</strong><br/><br/>
                        <div className={"flex w-full gap-8 text-justify md:p-4 p-2"}>
                        <div className={"w-1/2"}>
                        <strong>Visual Discrimination:</strong> The ability to differentiate and identify distinct
                        visual stimuli or details, crucial for tasks like reading and recognizing shapes.
                        <br/><br/><strong>Form Constancy Assessment:</strong> Examining the capability to recognize and
                        understand a form or object regardless of its size, position, or orientation.
                        <br/><br/><strong>Figure-Ground Discrimination:</strong> Assessing the capacity to distinguish
                        an object from its surrounding background.
                        <br/><br/><strong>Visual Closure Assessment:</strong> Gauging the ability to mentally complete
                        or identify a whole object when presented with incomplete visual information, contributing to
                        overall visual understanding.
                        </div>
                        <div className={"w-1/2"}>
                        <strong>Allocentric visual perception Assessment:</strong> Evaluating the ability to
                        perceive and understand the spatial relationships between objects from an external,
                        viewer-independent perspective.
                        <br/><br/><strong>Egocentric visual perception Assessment:</strong> Assessing the ability to
                        perceive and understand spatial relationships from a subjective, viewer-dependent perspective,
                        considering one's own position.
                        <br/><br/><strong>Motion-Based Dynamic Visual Cognitive Perception
                        Assessment:</strong> Examining cognitive processing abilities related to understanding and
                        interpreting visual information in motion, including tracking moving objects and perceiving
                        dynamic visual stimuli.
                        </div>
                        </div>

                </div>
            </div>
            <div className={"justify-center flex mb-4"}>
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

        </div>
    )
}
