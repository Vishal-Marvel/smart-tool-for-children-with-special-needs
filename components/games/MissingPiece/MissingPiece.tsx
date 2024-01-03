"use client"
import {Counter} from "@/components/Counter";
import {useState} from "react";
import {StaticImageData} from "next/image";
import axios from "axios";

import wrg1l1 from "@/public/missingpiece/test2_wrg1.png"
import wrg2l1 from "@/public/missingpiece/test2_wrg2.png"
import wrg3l1 from "@/public/missingpiece/test2_wrg3.png"
import wrg1l2 from "@/public/missingpiece/test2_wrg4.png"
import wrg2l2 from "@/public/missingpiece/test2_wrg5.png"
import wrg3l2 from "@/public/missingpiece/test2_wrg6.png"
import wrg1l3 from "@/public/missingpiece/test2_wrg7.png"
import wrg2l3 from "@/public/missingpiece/test2_wrg8.png"
import wrg3l3 from "@/public/missingpiece/test2_wrg9.png"
import l1 from "@/public/missingpiece/test2.png"
import l2 from "@/public/missingpiece/test2_l2.png"
import l3 from "@/public/missingpiece/test2_l3.png"
import crt1 from "@/public/missingpiece/test2_crt1.png"
import crt2 from "@/public/missingpiece/test2_crt2.png"
import crt3 from "@/public/missingpiece/test2_crt3.png"

import {Levels} from "@/components/games/MissingPiece/Levels";
import sound from "@/components/context/PlaySound";
import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";

interface Props {
    id: String
}

export const MissingPiece = ({id}: Props) => {
    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(0);
    const [initialTime, setInitialTime] = useState(20);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");

    const handleOnClick = (image: StaticImageData) => {
        if (!gameOver) {
            setGameOver(true);


            if (image === crt1 || image === crt2 || image === crt3) {
                sendDate(true);
                setMessage("It is the correct answer!!")
                sound.play();
            } else {
                setMessage("It is the wrong answer")
                sendDate(false);
            }

        }
    };

    const sendDate = (acc: boolean) => {
        axios
            .post("/api/game-over", {
                gameId: id,
                timeTaken: initialTime - time + 1,
                level: gameLev,
                accuracy: acc ? 1 : 0,
            })
            .then(() => {

                setDialogBox(true);
                setGameLev(gameLev + 1);

            })
            .catch((e) => console.log(e));
    };

    const startGame = () => {
        setMessage("");
        if (gameLev <= 3) {
            setKey(key + 1);
            setGameOver(false);
            setDialogBox(false);
        } else {
            router.push("/games/match");
        }
    }


    return (
        <div>
      <span
          className={"text-2xl pb-4 font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
        Spot the Missing Piece
      </span>
            <div className={"m-4 flex flex-row align-middle items-center justify-around "}>
                <Counter
                    restart={key}
                    isPlaying={!gameOver}
                    onCompleteFunc={() => {
                        setMessage("Time Up");
                        sendDate(false);
                    }}
                    onUpdateFunc={(remainingTime) => setTime(remainingTime)}
                    time={initialTime}
                />
                <span
                    className={"text-indigo-950 dark:text-indigo-50 text-2xl font-bold uppercase "}> Level - {gameLev}</span>
            </div>
            <div className={"justify-center justify-items-center align-middle"}>

                <Levels lev={gameLev} wrg1l1={wrg1l1} wrg2l1={wrg2l1} wrg3l1={wrg3l1} wrg1l2={wrg1l2} wrg2l2={wrg2l2}
                        wrg3l2={wrg3l2} crt1={crt1} crt2={crt2} l1={l1} l2={l2} crt3={crt3} wrg1l3={wrg1l3}
                        wrg2l3={wrg2l3} wrg3l3={wrg3l3} l3={l3}
                        handleOnClick={handleOnClick}/>
            </div>
            <PopUpNotification display={dialogBox} title={"Game Over"} message={message}
                               buttonOnClick={() => startGame()}/>
        </div>
    );
};
