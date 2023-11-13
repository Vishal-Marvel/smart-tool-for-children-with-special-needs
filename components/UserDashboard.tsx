import {db} from "@/lib/db";
import {ScrollArea} from "@/components/ui/scroll-area";
import memory from "@/public/memory.png"
import tictactoe from "@/public/tic-tac-toe.png"
import {GameCard} from "@/components/GameCard";
import Link from "next/link";
import {Separator} from "@radix-ui/react-select";

interface Props {
    id: any
}


export const UserDashboard = async ({id}: Props) => {
    let userGames = await db.user_Game.findMany({
        where: {
            userId: id
        }
    })
    const games = await db.game.findMany();
    const findGame = (id) => {
        return games.find(game => game.id === id)?.name
    }

    userGames = userGames.splice(-5);


    return (

        <div className={"p-4 flex flex-col"}>
            <span className={"text-2xl font-semibold"}>Game History</span>
            <div className="p-4">
                {userGames.map((game, index) => (
                    <span key={index} className={"flex p-2"}>
                    {findGame(game.gameId)}- {game.points} points
                    </span>
                ))}
                {userGames.length === 0 && (
                    <span>No Games found</span>
                )}
            </div>
            <div>
                <span className={"text-2xl font-semibold"}>Play A game</span>
                <div className={"grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center"}>
                    <Link href={"/games/memory-game"}>
                        <GameCard image={memory}
                                  text={"The objective of the game is to find all the matching pairs by clicking on the cards."}
                                  name={"Memory Game"}
                        />
                    </Link>
                    <Link href={"/games/tic-tac-toe"}>
                        <GameCard image={tictactoe}
                                  text={"In this game, the player needs to get three of the same symbol in a row, either horizontally, vertically, or diagonally, to win."}
                                  name={"Tic Tac Toe"}/>
                    </Link>

                </div>
            </div>

        </div>
    );
}