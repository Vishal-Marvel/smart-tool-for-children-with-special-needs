"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Volume2, VolumeX} from "lucide-react";

import {Howl} from "howler"

interface Props {
    dialog: boolean
    dialogChange: any
    gameName: string
    instructions: string[]

}

export const GameInstruction = ({dialog, dialogChange, gameName, instructions}: Props) => {
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <Dialog open={dialog}>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className={"capitalize"}>
                            {gameName}

                    </DialogTitle>
                    <DialogDescription>Lets see How To Play </DialogDescription>

                </DialogHeader>

                <DialogClose className={"hidden"}/>
                <div className={"m-2 p-2"}>

                    <ul className={"list-disc"}>
                        <li className={"mt-2 mb-2"}>
                            This Game Contains 3 levels
                        </li>
                        {instructions.map((instruction, index) => (
                            <li key={index} className={"mt-2 mb-2"}>
                                {instruction}
                            </li>
                        ))}

                    </ul>
                </div>
                <DialogFooter>
                    <Button onClick={dialogChange} className={"w-full m-2 "}>
                        I have Read the Instructions And I am Ready To Play
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}