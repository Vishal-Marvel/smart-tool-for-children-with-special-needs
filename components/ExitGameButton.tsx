"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {buttonVariants} from "@/components/ui/button";


export const ExitGameButton = () => {
    const router = useRouter();

    return (
        <AlertDialog>

            <AlertDialogTrigger className={cn("absolute flex gap-3 top-3 items-center left-3", buttonVariants({variant: "ghost"}))}>
                <ArrowLeft className={"h-5 w-5"}/>
                Exit Game
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You will be redirected to Dashboard
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>router.push("/tests")}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}