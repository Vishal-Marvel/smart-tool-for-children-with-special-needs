"use client"
import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CircularProgress} from "@mui/material";

interface Props {
    display: boolean,
    title: string,
    buttonText?: string,
    buttonOnClick: () => void,
    message?: string
}

export const PopUpNotification = ({display, title, buttonText, buttonOnClick, message}: Props) => {
    return (
        <Dialog open={display}>

            <DialogContent>
                <DialogClose className={"hidden"}/>
                <DialogTitle>{title}</DialogTitle>
                <div className={"m-2 w-full flex-col flex"}>
                    <span className={"text-indigo-950 pb-4"}>{message}</span>

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