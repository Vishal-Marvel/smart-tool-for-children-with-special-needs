import {db} from "@/lib/db";
import {GameDetail} from "@/components/GameDetail";
import {SideBar} from "@/components/SideBar";
import {currentProfile} from "@/lib/current-profile";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;
import {redirect} from "next/navigation";
import getAssetPathFromRoute from "next/dist/shared/lib/router/utils/get-asset-path-from-route";
import {getProfile} from "@/lib/getProfile";

const AnalysisPage = async (req, res) => {
    const user = await currentProfile();
    if (user.role === MemberRole.USER){
        return redirect("/analysis");
    }
    const { userId } = req.params;
    const dynamicUser = await getProfile(userId);
    const games = await db.game.findMany();
    games.sort((a,b)=>a.name.localeCompare(b.name))

    return (
        <div className={"flex flex-row m-2 p-2"}>
            <SideBar userName={dynamicUser.name}/>
            <div className={"w-full m-2 flex flex-col justify-center"}>
                {games.map((game, index) => (
                    <GameDetail
                        game={game}
                        userId={userId}
                        key={game.id}
                        // initialGameData={initialGameData[index]}
                    />
                ))}
            </div>
        </div>
    );
};



export default AnalysisPage;
