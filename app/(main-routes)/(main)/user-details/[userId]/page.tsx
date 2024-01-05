import {db} from "@/lib/db";
import {$Enums, User_Game, Users} from "@prisma/client";
import {GameDetail} from "@/components/GameDetail";
import ToggleButton from "@/components/ToggleButton";
import {currentUser, UserButton} from "@clerk/nextjs";
import {UserDetails} from "@/components/UserDetails";
import MemberRole = $Enums.MemberRole;
import {getProfile} from "@/lib/getProfile";
import {currentProfile} from "@/lib/current-profile";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";

const UserDetailsPage = async (req, res) => {
    const {userId} = req.params;
    const user = await currentProfile();
    const profile: Users = await getProfile(userId);
    const games = await db.game.findMany();
    return (
        <div className={"h-full flex flex-col items-center justify-center"}>
            <div className={"w-full flex justify-between  p-3"}>
                <div className={"flex flex-row justify-center items-center align-middle"}>
                    <Link href={"/dashboard"}><ArrowLeft/></Link>
                    <span className={"font-bold text-2xl capitalize ml-3"}>Test Details of {profile.name}</span>
                </div>
                <div className={"flex flex-row justify-between min-w-1/7"}>
                    <ToggleButton/>
                    {user.role === MemberRole.ADMIN && <UserButton afterSignOutUrl={"/"}/>}
                    {user.role === MemberRole.USER && <UserDetails profile={profile}/>}
                </div>
            </div>
            <div className={"w-full m-2 flex flex-col justify-center"}>
                {games.map((game, index) => (
                    // <GameDetail game={games[0]} userId={userId} key={games[0].id}/>
                    <GameDetail game={game} userId={userId} key={game.id}/>
                ))}
            </div>
        </div>
    )
}
export default UserDetailsPage;