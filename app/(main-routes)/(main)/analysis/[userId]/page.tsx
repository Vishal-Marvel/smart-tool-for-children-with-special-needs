import {db} from "@/lib/db";
import {GameDetail} from "@/components/GameDetail";
import {SideBar} from "@/components/SideBar";
import qs from "query-string";
import axios from "axios";

const AnalysisPage = async (req, res) => {
    const { userId } = req.params;
    const games = await db.game.findMany();
    // const initialGameData = [[]];
    // let gameData = []
    // games.map(async (game, index)=>{
    //     gameData = [];
    //     for (let i = 1; i < 4; i++) {
    //         const url = qs.stringifyUrl({
    //             url: "/api/getData",
    //             query: {
    //                 userId,
    //                 gameId: game.id, // or use a specific game ID
    //                 level: i,
    //             },
    //         });
    //         const data = (await axios.get(url)).data[0];
    //         gameData.push(data);
    //     }
    //     initialGameData.push(gameData);
    // })
    return (
        <div className={"flex flex-row"}>
            <SideBar />
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
