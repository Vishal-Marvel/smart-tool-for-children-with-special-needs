"use client"
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle} from "@/components/ui/dialog";
import React, {ReactNode, useState} from "react";

interface Props {
    open: boolean,
    title: string,
    children?: ReactNode,
    trueButtonFunc?: () => void,

}

const ConfirmDialogBox = ({open, title, children, trueButtonFunc}: Props) => {
    const [dialog, setDialog] = useState(open);
    console.log(dialog)
    return (
        <Dialog open={dialog} onOpenChange={() => setDialog(!dialog)}>

            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <div className={"flex justify-between p-4"}>

                    <Button onClick={trueButtonFunc}>
                        {children}
                    </Button>
                    <Button variant={"ghost"} onClick={() => (setDialog(false))}>
                        Cancel
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialogBox