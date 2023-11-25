"use client"
import {useRouter} from 'next/navigation'
import {SignOutButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useState} from "react";

const CustomSignOut = () => {
    const router = useRouter()
    const [dialog, setDialog] = useState(true);
    return (
        <Dialog open={dialog} onOpenChange={() => setDialog(!dialog)}>
            <DialogTrigger>
                <Button>Sign Out</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Confirm Sign Out ?</DialogTitle>
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
    );
};

export default CustomSignOut