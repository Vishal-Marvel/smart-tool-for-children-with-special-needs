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
import {sound} from "@/components/context/PlaySound";
import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";
import {GameInstruction} from "@/components/GameInstruction";
import {ExitGameButton} from "@/components/ExitGameButton";

interface Props {
    id: String
}

export const OddOneOut = ({id}: Props) => {
    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [num, setNum] = useState(0);
    const [initialTime, setInitialTime] = useState(6000);
    const [dialogBox, setDialogBox] = useState(false);
    const [instruction, setInstruction] = useState(true);
    const [message, setMessage] = useState("");

    const handleOnClick = (image: StaticImageData) => {
        if (!gameOver) {
            setGameOver(true);
            if (image === blue_circle || image === bee || image === oddPanda) {
                sendData(true);

            } else {
                sendData(false);
            }

        }
    };

    const sendData = (acc: boolean) => {
        sound.play();

        axios
            .post("/api/game-over", {
                gameId: id,
                timeTaken: initialTime - time + 1,
                level: gameLev,
                maximum: 1,
                accuracy: acc ? 1 : 0,
            })
            .then(() => {
                setTimeout(() => {
                    setDialogBox(true);
                    setMessage("You Have Completed Level " + gameLev);
                    setAccuracy((acc ? 1 : 0) * 100)
                    setNum((acc ? 5 : 1));
                    setGameLev(gameLev + 1);
                }, 2000)

            })
            .catch((e) => console.log(e));
    };

    const startGame = () => {
        sound.stop();
        setMessage("");
        if (gameLev <= 3) {
            setKey(key + 1);
            setGameOver(false);
            setDialogBox(false);
        } else {
            setGameOver(false);
            setNum(0);

            setMessage("Completed")
            router.push("/games/missing-piece");
        }
    }


    return (
        <div className={"flex flex-col items-center justify-evenly h-full"}>
            <ExitGameButton/>
            {instruction &&
                <GameInstruction
                    dialog={instruction}
                    dialogChange={() => setInstruction(false)}
                    gameName={"Pick The Odd One Out"}

                    instructions={["You need to identify the Odd One Out",
                        "You Need to click on the image which could be the odd one out"
                    ]}
                />}
            {!instruction && <>
      <span
          className={"text-3xl font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
        Pick The Odd One Out
      </span>
                <div className={"flex flex-row align-middle items-center justify-around "}>
                    <Counter
                        restart={key}
                        isPlaying={!gameOver}
                        onCompleteFunc={() => {
                            setMessage("Time Up");
                            sendData(false);
                        }}
                        onUpdateFunc={(remainingTime) => setTime(remainingTime)}
                        time={initialTime}
                    />
                    <span
                        className={"text-indigo-950 dark:text-indigo-50 text-2xl font-bold uppercase "}> Level - {gameLev}</span>
                </div>
                <div className={"justify-center justify-items-center align-middle"}>
                    {gameLev <= 2 &&
                        <LevOneAndLevTwo lev={gameLev} even1={green_circle} odd1={blue_circle} even2={basketBall}
                                         odd2={bee}
                                         handleOnClick={handleOnClick}/>}
                    {gameLev === 3 && <LevThree even={evenPanda} odd={oddPanda} handleClick={handleOnClick}/>}
                </div>
                <PopUpNotification display={dialogBox} title={"Odd One Out"} message={message}
                                   num={num}
                                   over={gameOver}
                                   accuracy={accuracy}
                                   time={initialTime - time}
                                   buttonOnClick={() => startGame()}/>
            </>
            }
        </div>
    );
};
