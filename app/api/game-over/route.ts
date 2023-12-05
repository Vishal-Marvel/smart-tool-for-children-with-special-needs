import {NextResponse} from "next/server";

import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";

export async function POST(
    req:Request
){
    try{
        const user = await currentProfile();
        const {gameId, moves, timeTaken} = await req.json();
        if (!user) {
            return new NextResponse("UnAuth", {status: 401});
        }
        // let points
        // const calculateMoves = () => {
        //     if (Math.abs(maxMoves-moves) > 10){
        //         points = 1
        //     }else if (Math.abs(maxMoves-moves) > 8){
        //         points = 2
        //     }
        //     else if (Math.abs(maxMoves-moves) > 6){
        //         points = 3
        //     }
        //     else if (Math.abs(maxMoves-moves) > 4){
        //         points = 4
        //     }else {
        //         points = 5
        //     }
        // }
        // calculateMoves();
        const user_game = await db.user_Game.create({
            data: {
                gameId,
                userId: user.id,
                moves,
                timeTaken
            }
        })
        return NextResponse.json(user_game)

    }catch (error){
        console.log("GAME", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}