"use client"
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import StarRating from "@/components/StarRating";
import {well, great, keep} from "@/components/context/PlaySound";
import {useEffect} from "react";
import {Loader2} from "lucide-react";

interface Props {
    display: boolean,
    title: string,
    buttonText?: string,
    buttonOnClick: () => void,
    message?: string,
    num?: number,
    over?: boolean,
    time?: number,
    accuracy?: number

}

export const PopUpNotification = ({
                                      display,
                                      title,
                                      buttonText,
                                      buttonOnClick,
                                      message,
                                      num,
                                      over,
                                  }: Props) => {
    useEffect(() => {
        if (display) {
            if (num === 5) {
                great.play()
            } else if (num < 5 && num > 2) {
                well.play()
            } else if (num > 0 && num <= 2) {
                keep.play()
            }
        }

    }, [num, display, title, message])

    return (
        <Dialog open={display}>

            <DialogContent>
                <DialogClose className={"hidden"}/>
                <DialogTitle>{title}</DialogTitle>
                <div className={"m-2 w-full flex-col flex space-y-4"}>
                    <span className={"text-indigo-950 pb-4"}>{message}</span>
                    {over &&
                        <div className={" flex flex-col "}>
                            <StarRating num={num}/>
                        </div>
                    }
                    {/*{accuracy}*/}
                    <DialogFooter>
                        <Button className={"w-full"} onClick={buttonOnClick} disabled={message === "Completed"}>
                            {message === "Completed" || message === "Loading" ?
                                <>
                                    <Loader2 className={"h-5 w-5 mr-4 animate-spin"}/> <span>Loading</span>
                                </> : buttonText ? buttonText : "Continue"}

                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}