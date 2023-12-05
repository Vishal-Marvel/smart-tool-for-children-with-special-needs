import {NextResponse} from "next/server";

import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";

export async function POST(
    req:Request
){
    try{
        const user = await currentProfile();
        const {gameId, timeTaken, level, accuracy} = await req.json();
        if (!user) {
            return new NextResponse("UnAuth", {status: 401});
        }

        const user_game = await db.user_Game.create({
            data: {
                gameId,
                userId: user.id,
                timeTaken,
                level,
                accuracy
            }
        })
        return NextResponse.json(user_game)

    }catch (error){
        console.log("GAME", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}