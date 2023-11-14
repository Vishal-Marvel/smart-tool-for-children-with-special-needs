import {db} from "@/lib/db";
import memory from "@/public/memory.png"
import ticTacToe from "@/public/tic-tac-toe.png"
import guessTheNumber from "@/public/guess the number.png"
import hangman from "@/public/hangman.png"
import RPS from "@/public/RPSgmae.png"
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

        <div className={"p-2 flex flex-col"}>

            <div className={"grid grid-cols-2"}>
                <div className={"flex flex-col"}>
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
                </div>
                <div className={"m-6 w-fit align-middle items-center justify-center"}>
                    <Link href={"/games/memory-game"}>
                        <span className={" font-bold bg-indigo-950 text-white p-2.5 rounded-2xl "}>Start Game</span>
                    </Link>
                </div>
            </div>
            <div className={"flex flex-col"}>


                <span className={"text-2xl font-semibold"}>Games</span>
                <div className={"grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 gap-10 justify-items-center"}>

                    <GameCard image={memory}
                              med={"Hand eye coordination."}
                              text={"The objective of the memory game is to find all the matching pairs by clicking on the cards."}
                              name={"Memory Game"}
                    />
                    <GameCard image={ticTacToe}
                              med={"Visual attention with coordination assessment"}
                              text={"In this game, the player needs to get three of the same symbol in a row, either horizontally, vertically, or diagonally, to win."}
                              name={"Tic Tac Toe"}/>
                    <GameCard image={guessTheNumber}
                              med={"visual problem solving ability with motor skill"}
                              text={"The goal of the game is for the player to guess a randomly generated number within a limited number of attempts."}
                              name={"Guess The Number"}/>
                    <GameCard image={hangman}
                              med={" visual cognitive reasoning with  motor stability"}
                              text={"The goal is for the guesser to discover the chosen word by suggesting letters one at a time, Before the full man is created "}
                              name={"Hangman"}/>
                    <GameCard image={RPS}
                              med={"Visual discrimination and motor response."}
                              text={"The game has three possible outcomes other than a tie: rock crushes scissors, scissors cuts paper, and paper covers rock."}
                              name={"Rock Paper Scissor"}/>
                </div>
            </div>

        </div>
    );
}