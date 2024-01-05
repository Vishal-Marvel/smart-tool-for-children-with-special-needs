import {NextResponse} from "next/server";

import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;

export async function GET(
    req:Request,
    {params}:{params: {userId:string, gameId:string, level:number}}
){
    try{
        const user = await currentProfile();

        if (!user) {
            return new NextResponse("UnAuth", {status: 401});
        }
        const {searchParams} = new URL(req.url);
        const gameId = searchParams.get("gameId");
        const userId = searchParams.get("userId");
        const level = Number(searchParams.get("level"));

        if (!gameId || !userId || !level) {
            return new NextResponse("Game ID, User Id, level missing", { status: 400 });
        }
        const user_game = await db.user_Game.findMany({
           where:{
               gameId,
               userId,
               level
           },
            orderBy:{
               date:"desc",
            },
            take:1
        })
        // console.log(user_game[0])
        return NextResponse.json(user_game)

    }catch (error){
        console.log("Fetching GAME", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}