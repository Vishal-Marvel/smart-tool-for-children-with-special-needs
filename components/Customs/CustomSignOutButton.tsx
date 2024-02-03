"use client"
import {SignOutButton, useClerk} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {Button, buttonVariants} from "@/components/ui/button";
import React, {useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";

const CustomSignOutButton = ({variant}:{variant?:"secondary"}) => {
    const [dialog, setDialog] = useState(false)
    const { signOut } = useClerk();
    const router = useRouter();
    return (
        <Dialog open={dialog} onOpenChange={() => setDialog(!dialog)}>
            <DialogTrigger className={cn(buttonVariants({variant: variant ? variant : "destructive"}), "w-[150px]")}>
                Sign Out
            </DialogTrigger>
            <DialogContent>

                <DialogTitle>Confirm Sign Out?</DialogTitle>
                <div className={"flex justify-between p-4"}>

                    <Button  onClick={() => signOut(() => router.push("/"))}>
                        Sign Out
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