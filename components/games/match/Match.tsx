"use client"
import {Counter} from "@/components/Counter";
import {useState} from "react";
import {StaticImageData} from "next/image";
import axios from "axios";

import a1l1 from "@/public/match/a1l1.png"
import a2l1 from "@/public/match/a2l1.png"
import q1l1 from "@/public/match/q1l1.png"
import q2l1 from "@/public/match/q2l1.png"
import a1l2 from "@/public/match/a1l2.png"
import a2l2 from "@/public/match/a2l2.png"
import a3l2 from "@/public/match/a3l2.png"
import q1l2 from "@/public/match/q1l2.png"
import q2l2 from "@/public/match/q2l2.png"
import q3l2 from "@/public/match/q3l2.png"
import a1l3 from "@/public/match/a1l3.png"
import a2l3 from "@/public/match/a2l3.png"
import a3l3 from "@/public/match/a3l3.png"
import a4l3 from "@/public/match/a4l3.png"
import q1l3 from "@/public/match/q1l3.png"
import q2l3 from "@/public/match/q2l3.png"
import q3l3 from "@/public/match/q3l3.png"
import q4l3 from "@/public/match/q4l3.png"


import {Levels} from "@/components/games/match/Levels";
import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";
import {sound} from "@/components/context/PlaySound";
import {GameInstruction} from "@/components/GameInstruction";
import {ExitGameButton} from "@/components/ExitGameButton";

interface Props {
    id: String
}
interface ImageData {
    question: StaticImageData;
    answer: StaticImageData;
 }

export const Match = ({id}: Props) => {
    const router = useRouter();
    let score = 0;
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(0);
    const [initialTime, setInitialTime] = useState(6000);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");
    const [accuracy, setAccuracy] = useState(0);
    const [num, setNum] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [instruction, setInstruction] = useState(true);

    const imageDataArray: ImageData[] = [
        {question: q1l1, answer: a1l1},
        {question: q2l1, answer: a2l1},
        {question: q1l2, answer: a1l2},
        {question: q2l2, answer: a2l2},
        {question: q3l2, answer: a3l2},
        {question: q1l3, answer: a1l3},
        {question: q2l3, answer: a2l3},
        {question: q3l3, answer: a3l3},
        {question: q4l3, answer: a4l3},

    ];


    const handleOnDraw = (images: ImageData[]) => {
        setGameOver(true);
        setMessage("You Have Completed Level " + gameLev);
        images.forEach((pair) => {
            // Find the corresponding question in imageDataArray based on the answer in the pair
            const correspondingQuestion = imageDataArray.find(
                (data) => data.question === pair.question
            );

            if (correspondingQuestion.answer == pair.answer) {
                // console.log("correct" + score)
                score += 1;
            }
        });
        sendData();
    };

    const sendData = () => {
        sound.play()
        const maximum = gameLev==1 ? 2 : gameLev==2 ? 3 : 4
        axios
            .post("/api/game-over", {
                gameId: id,
                timeTaken: initialTime - time + 1,
                level: gameLev,
                maximum,
                accuracy: score,
            })
            .then(() => {
                setTimeout(() => {
                    setDialogBox(true);
                    setGameLev(gameLev + 1);
                    setMessage("You Have Completed Level "+gameLev);
                    // @ts-ignore
                    // setAccuracy(Math.floor(score/maximum*100)>0 || 1);
                    setNum(Math.floor(score/maximum*5) || 1);
                    score = 0;
                    setTimeUp(false);
                }, 2000)
                // console.log(score/(gameLev==1 ? 2 : gameLev==2 ? 3 : gameLev==3 && 4), Math.floor(score/(gameLev==1 ? 2 : gameLev==2 ? 3 : gameLev==3 && 4)*100));

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

            router.push("/games/dot-to-dot");
        }
    }


    return (
        <div className={"flex flex-col items-center justify-evenly h-full"}>
            <ExitGameButton/>
            {instruction &&
                <GameInstruction
                    dialog={instruction}
                    dialogChange={() => setInstruction(false)}
                    gameName={"Match The Image"}
                    instructions={["You need to match the hidden image",
                        "Drag an image from Column A and drop it on an image in the Column B",
                        "Once an image is matched the image shrinks which means you can't rematch"
                    ]}
                />}
            {!instruction && <>

              <span
                  className={"text-2xl pb-4 font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
                Match the image
              </span>
            <div className={"m-4 flex flex-row align-middle items-center justify-around "}>
                <Counter
                    restart={key}
                    isPlaying={!gameOver}
                    onCompleteFunc={() => {
                        setMessage("Time Up");
                        setTimeUp(true);
                    }}
                    onUpdateFunc={(remainingTime) => setTime(remainingTime)}
                    time={initialTime}
                />
                <span
                    className={"text-indigo-950 dark:text-indigo-50 text-2xl font-bold uppercase "}> Level - {gameLev}</span>
            </div>
            <div className={"justify-center justify-items-center align-middle"}>

                <Levels lev={gameLev} a1l1={a1l1} a2l1={a2l1} q1l1={q1l1} q2l1={q2l1} q1l2={q1l2}
                        q2l2={q2l2} q3l2={q3l2} a1l3={a1l3} a2l3={a2l3} a3l3={a3l3} a4l3={a4l3}
                        q1l3={q1l3} q2l3={q2l3} q3l3={q3l3} q4l3={q4l3} a1l2={a1l2} a2l2={a2l2} a3l2={a3l2}
                        handleOnDraw={handleOnDraw} timeup={timeUp}/>
            </div>
            <PopUpNotification display={dialogBox} title={"Match The Image"} message={message}
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
