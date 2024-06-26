"use client"
import {Counter} from "@/components/Counter";
import {useEffect, useState} from "react";
import {StaticImageData} from "next/image";
import axios from "axios";

import al1 from "@/public/Distance/al1.png"
import l2a1 from "@/public/Distance/l2a1.png"
import l2a2 from "@/public/Distance/l2a2.png"
import l2w1 from "@/public/Distance/l2w1.png"
import l2w2 from "@/public/Distance/l2w2.png"
import l2w3 from "@/public/Distance/l2w3.png"
import l2w4 from "@/public/Distance/l2w4.png"
import l2w5 from "@/public/Distance/l2w5.png"
import l2w6 from "@/public/Distance/l2w6.png"
import l3a1 from "@/public/Distance/l3a1.png"
import l3a2 from "@/public/Distance/l3a2.png"
import l3a3 from "@/public/Distance/l3a3.png"
import l3w1 from "@/public/Distance/l3w1.png"
import l3w2 from "@/public/Distance/l3w2.png"
import l3w3 from "@/public/Distance/l3w3.png"
import l3w4 from "@/public/Distance/l3w4.png"
import l3w5 from "@/public/Distance/l3w5.png"
import l3w6 from "@/public/Distance/l3w6.png"
import l3w7 from "@/public/Distance/l3w7.png"
import l3w8 from "@/public/Distance/l3w8.png"
import l3w9 from "@/public/Distance/l3w9.png"
import l3 from "@/public/Distance/test6.png"
import l1 from "@/public/Distance/test6l1.png"
import l2 from "@/public/Distance/test6l2.png"
import w1l1 from "@/public/Distance/w1l1.png"
import w2l1 from "@/public/Distance/w2l1.png"
import w3l1 from "@/public/Distance/w3l1.png"

import {Levels} from "@/components/games/Distance/Levels";
import {sound} from "@/components/context/PlaySound";
import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";
import {GameInstruction} from "@/components/GameInstruction";
import {ExitGameButton} from "@/components/ExitGameButton";

interface Props {
    id: String
}

export const Distance = ({id}: Props) => {
    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0);
    const [key, setKey] = useState(0);
    const [initialTime, setInitialTime] = useState(6000);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");
    const [count, setCount] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [num, setNum] = useState(0);
    const [instruction, setInstruction] = useState(true);

    const handleOnClick = (image: StaticImageData) => {
        if (!gameOver) {

            if (image === al1 || image === l2a1 || image === l3a1 || image === l2a2 || image === l3a2 || image === l3a3) {
                // console.log("correct");
                //
                // // setMessage("It is the correct answer!!")
                // console.log("cor", score);
                setScore(prevState => prevState + 1);
            }
            setCount(count + 1)
        }
    }

    const sendData = () => {
        sound.play();
        axios
            .post("/api/game-over", {
                gameId: id,
                timeTaken: initialTime - time + 1,
                level: gameLev,
                maximum: gameLev,
                accuracy: score,
            })
            .then(() => {
                setTimeout(() => {
                    setDialogBox(true);
                    setMessage("You Have Completed Level " + gameLev)
                    setAccuracy(Math.floor((score) / gameLev * 100));
                    setNum(Math.floor((score) / (gameLev) * 5) || 1);
                    setGameLev(gameLev + 1);
                    setCount(0);
                    setScore(0);
                }, 2000)



            })
            .catch((e) => console.log(e));
    };

    const startGame = () => {
        sound.stop();
        setMessage("");
        if (gameLev <= 3) {
            setKey(key + 1);
            if (gameLev === 3) {
                setInitialTime(30);
            }
            setGameOver(false);

            setDialogBox(false);
        } else {
            setGameOver(false);
            setNum(0);

            setMessage("Completed");
            router.push("/games/arrow-challenge");
        }
    }
    useEffect(() => {
        if ((gameLev < 2 && count == 1) || (gameLev == 2 && count == 2) || (gameLev == 3 && count == 3)) {
            setGameOver(true);
            sendData();

        }
    }, [count]);


    return (
        <div className={" flex flex-col items-center justify-evenly h-full"}>
            <ExitGameButton/>
            {instruction &&
                <GameInstruction
                    dialog={instruction}
                    dialogChange={() => setInstruction(false)}
                    gameName={"Distance Dash"}
                    instructions={["You need to Answer the question by selecting the right option"
                    ]}
                />}
            {!instruction && <>
      <span
          className={"text-2xl pb-4 font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
        Distance Dash
      </span>
            <div className={"m-4 flex flex-row align-middle items-center justify-around "}>
                <Counter
                    restart={key}
                    isPlaying={!gameOver}
                    onCompleteFunc={() => {
                        setMessage("Time Up");
                        sendData();
                    }}
                    onUpdateFunc={(remainingTime) => setTime(remainingTime)}
                    time={initialTime}
                />
                <span
                    className={"text-indigo-950 dark:text-indigo-50 text-2xl font-bold uppercase "}> Level - {gameLev}</span>
            </div>
            <div className={"justify-center justify-items-center align-middle"}>

                <Levels lev={gameLev} count={count} w1l1={w1l1} w2l1={w2l1} w3l1={w3l1} l2w1={l2w1} l2w2={l2w2}
                        l2w3={l2w3} l2w4={l2w4} l2w5={l2w5} l1={l1} l2={l2} l2w6={l2w6} l3w1={l3w1}
                        l3w2={l3w2} l3w3={l3w3} l3={l3} l3w4={l3w4} l3w5={l3w5} l3w6={l3w6} l3w7={l3w7} l3w8={l3w8}
                        l3w9={l3w9} al1={al1} l2a1={l2a1}
                        l2a2={l2a2} l3a1={l3a1} l3a2={l3a2} l3a3={l3a3}
                        handleOnClick={handleOnClick}/>
            </div>
            <PopUpNotification display={dialogBox} title={"Distance Dash"} message={message}
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
