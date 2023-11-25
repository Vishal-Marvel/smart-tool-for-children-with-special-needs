"use client"
import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

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
                <div className={"pt-4 m-2 w-full"}>
                    {message}

                    <Button className={"w-full"} onClick={buttonOnClick}>{buttonText ? buttonText : "Continue"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}