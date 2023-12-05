import Link from "next/link";
import {GameCard} from "@/components/GameCard";
import memory from "@/public/memory.png";
import oddOne from "@/public/odd-one.png";


export const UserDashboard = () => {

    return (

        <div className={"p-2 flex flex-col"}>

            <div className={"flex flex-col"}>


                <div className={"m-6 w-fit align-middle items-center justify-center"}>
                    <Link href={"/games/odd-one-out"}>
                        <span className={" font-bold bg-indigo-950 text-white p-2.5 rounded-2xl "}>Start Game</span>
                    </Link>
                </div>

            </div>
            <div className={"m-4 p-2"}>
                <span className={"text-2xl font-semibold"}>Games Available</span>

                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"}>

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

                </div>
            </div>
        </div>
    );
}