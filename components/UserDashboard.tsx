import {db} from "@/lib/db";
import memory from "@/public/memory.png"
import ticTacToe from "@/public/tic-tac-toe.png"
import guessTheNumber from "@/public/guess the number.png"
import {GameCard} from "@/components/GameCard";
import Link from "next/link";

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

    userGames = userGames.splice(-5).reverse();


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
            <div className={"flex flex-col"}>
                <span className={"text-2xl font-semibold"}>Play A game</span>
                <div className={"m-2 flex flex-row text-center justify-items-center items-center w-fit"}>
                    <Link href={"/games/memory-game"}>
                    <span className={" font-bold bg-indigo-950 text-white p-2 rounded-2xl "}>Start Game</span>
                    </Link>
                </div>
                <div className={"grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center"}>

                <GameCard image={memory}
                          text={"The objective of the game is to find all the matching pairs by clicking on the cards."}
                          name={"Memory Game"}
                />

                <GameCard image={ticTacToe}
                          text={"In this game, the player needs to get three of the same symbol in a row, either horizontally, vertically, or diagonally, to win."}
                          name={"Tic Tac Toe"}/>
                <GameCard image={guessTheNumber}
                          text={"The goal of the game is for the player to guess a randomly generated number within a limited number of attempts."}
                          name={"Guess The Number"}/>

                </div>
            </div>

        </div>
    );
}