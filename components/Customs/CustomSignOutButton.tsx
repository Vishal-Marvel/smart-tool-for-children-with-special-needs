"use client"
import {SignOutButton} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const CustomSignOutButton = () => {
    const [dialog, setDialog] = useState(false)
    const router = useRouter();
    return (
        <Dialog open={dialog} onOpenChange={() => setDialog(!dialog)}>
            <DialogTrigger>
                <Button onClick={() => (setDialog(true))}>
                    Sign Out
                </Button>
            </DialogTrigger>
            <DialogContent>

                <DialogTitle>Confirm Sign Out?</DialogTitle>
                <div className={"flex justify-between p-4"}>

                    <Button>
                        <SignOutButton signOutCallback={() => router.push("/")}/>
                    </Button>
                    <Button variant={"ghost"} onClick={() => (setDialog(false))}>
                        Cancel
                    </Button>
                </div>

            </DialogContent>
        </Dialog>

    )
}
export default CustomSignOutButton;