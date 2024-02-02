import Link from "next/link";
import {GameCard} from "@/components/GameCard";
import memory from "@/public/memory.png";
import oddOne from "@/public/odd-one.png";
import missingPiece from "@/public/missingpiece.png";
import match from "@/public/match.png";
import dot from "@/public/dot.png";
import arrow from "@/public/arrow.png";
import distance from "@/public/distance.png";
import {Button} from "@/components/ui/button";
import {SideBar} from "@/components/SideBar";
import {currentProfile} from "@/lib/current-profile";
import axios from "axios";
import {redirect, useRouter} from "next/navigation";
import {StartGameButton} from "@/components/StartGameButton";

const  Tests = async () => {
    const user = await currentProfile();
    // const router = useRouter();

    return (

        <div className={"p-2 flex flex-col md:flex-row m-2 "}>

            <SideBar user={user}/>
            <div className={"m-4 p-2"}>
                <div>
                    <StartGameButton/>
                </div>
                <div className={"flex flex-row flex-wrap justify-center justify-items-center"}>

                    <GameCard image={memory}
                              med={"Figure Ground Discrimination"}
                              text={"Identify and locate the hidden objects using memory"}
                              name={"Pair The Hidden Object"}
                              link={"/games/memory-game"}
                    />
                    <GameCard image={oddOne}
                              med={"Visual Discrimination"}
                              text={"Identify the object that is different from the rest. Tap or click on the object believed to be the odd one out."}
                              name={"Odd One Out"}
                              link={"/games/odd-one-out"}
                    />
                    <GameCard image={missingPiece}
                              med={"Form constancy assessment"}
                              text={"Identify the missing piece from a set of given options"}
                              name={"Spot The Missing Piece"}
                              link={"/games/mission-piece"}
                    />
                    <GameCard image={match}
                              med={"Visual closure assessment"}
                              text={"Identify and match the hidden image."}
                              name={"Match The Image"}
                              link={"/games/match"}
                    />
                    <GameCard image={dot}
                              med={"Allocentric visual perception Assessment"}
                              text={"Connect the dots on the right-hand side to replicate the pattern from the left."}
                              name={"Dot To Dot"}
                              link={"games/dot-to-dot"}
                    />
                    <GameCard image={distance}
                              med={"Egocentric visual perception Assessment"}
                              text={"Answer the questions by selecting the right options"}
                              name={"Distance Dash"}
                              link={"games/distance"}
                    />
                    <GameCard image={arrow }
                              med={"Motion-based dynamic visual cognitive perception"}
                              text={"Identify the arrow that faces the opposite direction among a fleet of arrows moving across the screen"}
                              name={"The Arrow Challenge"}
                              link={"games/arrow-challenge"}
                    />

                </div>
            </div>
        </div>
    );
}

export default Tests;