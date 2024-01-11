import {db} from "@/lib/db";
import {GameDetail} from "@/components/GameDetail";
import {SideBar} from "@/components/SideBar";
import {currentProfile} from "@/lib/current-profile";

const AnalysisPage = async () => {
    const user = await currentProfile();
    const games = await db.game.findMany();
    games.sort((a,b)=>a.name.localeCompare(b.name))


    return (
        <div className={"flex flex-row m-2 p-2"}>
            <SideBar user={user}/>
            <div className={"w-full m-2 flex flex-col justify-center"}>
                {games.map((game, index) => (
                    <GameDetail
                        game={game}
                        userId={user.id}
                        key={game.id}
                        // initialGameData={initialGameData[index]}
                    />
                ))}
            </div>
        </div>
    );
};



export default AnalysisPage;
