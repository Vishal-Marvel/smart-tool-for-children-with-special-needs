"use client"
import {SignOutButton} from "@clerk/nextjs";
import ConfirmDialogBox from "@/components/ConfirmDialogBox";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {useState} from "react";

const CustomSignOutButton = () => {
    const [dialog, setDialog] = useState(false)
    const router = useRouter();
    return (
        <Button onClick={() => (setDialog(true))}>
            <ConfirmDialogBox open={dialog}
                              title={"Confirm Sign Out?"}
            >
                <SignOutButton signOutCallback={() => router.push("/")}/>
            </ConfirmDialogBox>
            Sign Out
        </Button>
    )
}
export default CustomSignOutButton;