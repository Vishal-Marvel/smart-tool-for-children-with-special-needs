"use client"
import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircularProgress} from "@mui/material";
import StarRating from "@/components/StarRating";

interface Props {
    display: boolean,
    title: string,
    buttonText?: string,
    buttonOnClick: () => void,
    message?: string,
    num?:number,
    over?:boolean,
    time?:number,
    accuracy?:number

}

export const PopUpNotification = ({display, title, buttonText, buttonOnClick, message, num, over, time, accuracy}: Props) => {
    return (
        <Dialog open={display}>

            <DialogContent>
                <DialogClose className={"hidden"}/>
                <DialogTitle>{title}</DialogTitle>
                <div className={"m-2 w-full flex-col flex"}>
                    <span className={"text-indigo-950 pb-4"}>{message}</span>
                    {over&&
                    <div className={"m-2 flex flex-col "}>
                        <StarRating num={num}/>
                        <span><strong>Accuracy:</strong> {accuracy} %</span>
                        <span><strong>Time Taken:</strong> {time} s</span>
                    </div>
                    }

                    <Button className={"w-full"} onClick={buttonOnClick} disabled={message==="Completed"}>
                        {message==="Completed" || message === "Loading" ?
                        <>
                            <CircularProgress className={"h-3 w-3 mr-4"}/> <span>Loading</span>
                        </>:buttonText ? buttonText : "Continue"}

                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}