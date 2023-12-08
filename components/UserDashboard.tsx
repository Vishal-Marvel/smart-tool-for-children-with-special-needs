import Link from "next/link";
import {GameCard} from "@/components/GameCard";
import memory from "@/public/memory.png";
import oddOne from "@/public/odd-one.png";
import missingpiece from "@/public/missingpiece.png";
import match from "@/public/match.png";

export const UserDashboard = () => {

    return (

        <div className={"p-2 flex flex-col"}>

            <div className={"flex flex-col"}>


                <div className={"m-6 w-fit align-middle items-center justify-center"}>
                    <Link href={"/games/match"}>
                        <span className={" font-bold bg-indigo-950 text-white p-2.5 rounded-2xl "}>Start Game</span>
                    </Link>
                </div>

            </div>
            <div className={"m-4 p-2"}>
                <span className={"text-2xl font-semibold"}>Games Available</span>

                <div className={"flex flex-row flex-wrap justify-center justify-items-center"}>

                    <GameCard image={memory}
                              med={"Hand eye coordination."}
                              text={"The objective of the memory game is to find all the matching pairs by clicking on the cards."}
                              name={"Memory Game"}
                    />
                    <GameCard image={oddOne}
                              med={"Visual Discrimination"}
                              text={"Identify the object that is different from the rest. Tap or click on the object believed to be the odd one out."}
                              name={"Odd One Out"}
                    />
                    <GameCard image={missingpiece}
                              med={"Form constancy assessment"}
                              text={"Identify the missing piece from a set of given options. Tap or click on the option."}
                              name={"Spot The Missing Piece"}
                    />
                    <GameCard image={match}
                              med={"Visual closure assessment"}
                              text={"Identify and match the hidden image. Tap, draw or click on the option."}
                              name={"Match The Image"}
                    />
                    <GameCard image={match}
                              med={"Visual closure assessment"}
                              text={"Identify and match the hidden image. Tap, draw or click on the option."}
                              name={"Match The Image"}
                    />

                </div>
            </div>
        </div>
    );
}