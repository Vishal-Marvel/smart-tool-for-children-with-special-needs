import {db} from "@/lib/db";
import {GameDetail} from "@/components/GameDetail";
import {SideBar} from "@/components/SideBar";
import {currentProfile} from "@/lib/current-profile";
import {Frown, Loader2} from "lucide-react";
import {StartGameButton} from "@/components/StartGameButton";

const AnalysisPage = async () => {
    const user = await currentProfile();
    const games = await db.game.findMany();
    games.sort((a, b) => a.name.localeCompare(b.name))
    let userGames = null ;
    userGames = await db.user_Game.findMany({where:{userId:user.id}});

    return (
        <div className={"flex flex-col md:flex-row m-2 p-2"}>
            <SideBar user={user}/>
            <div className={"w-full m-2 flex flex-col justify-center"}>
                {userGames === null && <Loader2 className={"animate-spin h-10 w-10"}/>}
                {userGames.length > 0 ?
                    <>
                        {games.map((game, index) => (
                            <GameDetail
                                game={game}
                                userId={user.id}
                                key={game.id}
                                // initialGameData={initialGameData[index]}
                            />
                        ))}
                    </>
                    : <div className={"flex flex-col justify-center items-center gap-4"}>
                        <div className={"text-center text-3xl font-bold flex gap-2 items-center"}>
                            <Frown/> No Data Found
                        </div>
                        <StartGameButton/>
                    </div>
                }
            </div>
        </div>
    );
};


export default AnalysisPage;
