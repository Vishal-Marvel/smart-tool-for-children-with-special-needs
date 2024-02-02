import {currentProfile} from "@/lib/current-profile";
import {db} from "@/lib/db";
import {NextResponse} from "next/server";

export async function GET(){
    try {
        const user = await currentProfile();
        await db.user_Game.deleteMany({
            where:{userId:user.id}
        })
        return NextResponse.json("Previous Games deleted");
    }catch (e){
        console.log("START GAME", e)
        return new NextResponse("Internal Error", {status: 500});

    }
}