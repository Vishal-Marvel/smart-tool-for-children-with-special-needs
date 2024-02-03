"use client"

import {useRouter} from "next/navigation";
import axios from "axios";
import {Button} from "@/components/ui/button";
import {Loader, Loader2} from "lucide-react";
import {useState} from "react";

export const StartGameButton = () => {
    const router = useRouter();
    const [clicked, setClicked] = useState(false)
    const handleStartNew = async () => {
        setClicked(true)
        try {
            await axios.get("/api/start-game");
            router.push("/games/memory-game")

        } catch (e) {
            console.log(e)
            router.push("/games/memory-game")

        }
    }
    return (
        <Button onClick={handleStartNew} className={" w-[150px]"} disabled={clicked}>

            {clicked ? <Loader2 className={"h-5 w-5 animate-spin mr-2"}/> :
            "Start New Game"}</Button>
    )
}