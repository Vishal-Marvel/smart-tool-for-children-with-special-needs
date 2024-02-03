"use client"
import {useRouter} from 'next/navigation'
import {Button} from "@/components/ui/button";
import {Edit} from "lucide-react";

const ProfileEditButton = () => {
    const router = useRouter()

    return (
        <Button variant={"ghost"} className={"rounded-xl"} onClick={() => router.push("/edit-profile")}>

            <Edit/> <span className={"pl-2"}>Edit</span>
        </Button>

    );
};

export default ProfileEditButton