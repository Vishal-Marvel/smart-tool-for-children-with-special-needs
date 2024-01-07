import Link from "next/link";
import {GameCard} from "@/components/GameCard";
import memory from "@/public/memory.png";
import oddOne from "@/public/odd-one.png";
import missingPiece from "@/public/missingpiece.png";
import match from "@/public/match.png";
import dot from "@/public/dot.png";
import distance from "@/public/distance.png";
import {currentProfile} from "@/lib/current-profile";
import {Button} from "@/components/ui/button";
import {UserDetails} from "@/components/UserDetails";
import {SideBar} from "@/components/SideBar";

const  Tests = async () => {
    return (

        <div className={"p-2 flex "}>

            <SideBar/>
            <div className={"m-4 p-2"}>
                {/*<span className={"text-2xl font-semibold"}>Test Available</span>*/}
                <Link href={"/games/memory-game"}>
                    <Button className={"w-full"}>Start Test</Button>
                </Link>
                <div className={"flex flex-row flex-wrap justify-center justify-items-center"}>

                    <GameCard image={memory}
                              med={"Figure Ground Discrimination"}
                              text={"The objective of this test is to find all the matching pairs by clicking on the cards."}
                              name={"Pair The Hidden Object"}
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

export default Tests;