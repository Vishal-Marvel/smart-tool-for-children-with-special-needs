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
import a5l3 from "@/public/match/a5l3.png"
import q1l3 from "@/public/match/q1l3.png"
import q2l3 from "@/public/match/q2l3.png"
import q3l3 from "@/public/match/q3l3.png"
import q4l3 from "@/public/match/q4l3.png"
import q5l3 from "@/public/match/q5l3.png"


import {Levels} from "@/components/games/match/Levels";
import sound from "@/components/context/PlaySound";
import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";

interface Props {
    id: String
}
interface ImageData {
    question: StaticImageData;
    answer: StaticImageData;
 }

export const Match = ({id}: Props) => {
    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(0);
    const [initialTime, setInitialTime] = useState(20);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");

    const imageDataArray: ImageData[] = [
        { question: q1l1, answer: a1l1 },
        { question: q2l1, answer: a2l1 },
        { question: q1l2, answer: q1l2 },
        
      ];
      
      const handleOnDraw = (drawnAnswer: StaticImageData, questionImage: StaticImageData) => {
        if (!gameOver) {
          const matchedPair = imageDataArray.find((pair) => pair.question === questionImage);
      
          if (matchedPair && drawnAnswer === matchedPair.answer) {
            // If the drawn answer matches the correct answer for the question
            sendDate(true);
            setMessage("It is the correct answer!!");
            sound.play();
          } else {
            // If the drawn answer does not match the correct answer for the question
            setMessage("It is the wrong answer");
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
        Match the image
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

                <Levels lev={gameLev} a1l1={a1l1} a2l1={a2l1} q1l1={q1l1} q2l1={q2l1} q1l2={q1l2}
                        q2l2={q2l2} q3l2={q3l2} a1l3={a1l3} a2l3={a2l3} a3l3={a3l3} a4l3={a4l3} a5l3={a5l3}
                        q1l3={q1l3} q2l3={q2l3} q3l3={q3l3} q4l3={q4l3} q5l3={q5l3} a1l2={a1l2} a2l2={a2l2} a3l2={a3l2}
                        handleOnDraw={handleOnDraw}  />
            </div>
            <PopUpNotification display={dialogBox} title={"Game Over"} message={message}
                               buttonOnClick={() => startGame()}/>
        </div>
    );
};
