"use client"
import {Counter} from "@/components/Counter";
import {useState} from "react";
import {StaticImageData} from "next/image";
import axios from "axios";

import blue_circle from "@/public/oddOneOut/blue-circle.webp"
import green_circle from "@/public/oddOneOut/green-circle.webp"
import basketBall from "@/public/oddOneOut/basketball.webp"
import bee from "@/public/oddOneOut/bee.webp"
import oddPanda from "@/public/oddOneOut/odd_panda.png"
import evenPanda from "@/public/oddOneOut/even_panda.png"

import {LevOneAndLevTwo} from "@/components/games/OddOneOut/LevOneAndLevTwo";
import {LevThree} from "@/components/games/OddOneOut/LevThree";
import sound from "@/components/context/PlaySound";
import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";

interface Props {
    id: String
}

export const OddOneOut = ({id}: Props) => {
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


            if (image === blue_circle || image === bee || image === oddPanda) {
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
            router.push("/dashboard");
        }
    }


    return (
        <div>
      <span
          className={"text-2xl pb-4 font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
        Pick The Odd One Out
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
                {gameLev <= 2 &&
                    <LevOneAndLevTwo lev={gameLev} even1={green_circle} odd1={blue_circle} even2={basketBall} odd2={bee}
                                     handleOnClick={handleOnClick}/>}
                {gameLev === 3 && <LevThree even={evenPanda} odd={oddPanda} handleClick={handleOnClick}/>}
            </div>
            <PopUpNotification display={dialogBox} title={"Game Over"} message={message}
                               buttonOnClick={() => startGame()}/>
        </div>
    );
};
