import Link from "next/link";
import {GameCard} from "@/components/GameCard";
import memory from "@/public/memory.png";
import oddOne from "@/public/odd-one.png";
import missingPiece from "@/public/missingpiece.png";
import match from "@/public/match.png";
import dot from "@/public/dot.png";
import distance from "@/public/distance.png";
import {currentProfile} from "@/lib/current-profile";

export const UserDashboard = async () => {
    const user = await currentProfile();
    return (

        <div className={"p-2 flex flex-col"}>

            <div className={"flex flex-col"}>


                <div className={"m-6 w-fit align-middle items-center justify-center"}>
                    <Link href={"/games/memory-game"}>
                        <span className={" font-bold bg-indigo-950 text-white p-2.5 rounded-2xl "}>Start Test</span>
                    </Link>
                    <Link className={"ml-5"} href={"/user-details/"+user.id}>
                        <span className={" font-bold bg-indigo-950 text-white p-2.5 rounded-2xl "}>Analysis</span>
                    </Link>
                </div>

            </div>
            <div className={"m-4 p-2"}>
                <span className={"text-2xl font-semibold"}>Test Available</span>

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
                    <GameCard image={missingPiece}
                              med={"Form constancy assessment"}
                              text={"Identify the missing piece from a set of given options. Tap or click on the option."}
                              name={"Spot The Missing Piece"}
                    />
                    <GameCard image={match}
                              med={"Visual closure assessment"}
                              text={"Identify and match the hidden image. Tap, draw or click on the option."}
                              name={"Match The Image"}
                    />
                    <GameCard image={dot}
                              med={"Allocentric visual perception Assessment"}
                              text={"Connect the dots on the right-hand side to replicate the pattern from the left. Use tapping, clicking, or drawing to place each dot accurately."}
                              name={"Dot To Dot"}
                    />
                     <GameCard image={distance}
                              med={"Egocentric visual perception Assessment"}
                              text={"Answer the questions by selecting the right options"}
                              name={"Distance Dash"}
                    />

                </div>
            </div>
        </div>
    );
}