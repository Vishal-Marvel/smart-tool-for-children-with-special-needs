"use client"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import sound from "@/components/context/PlaySound";
import axios from "axios";
import {Counter} from "@/components/Counter";
import {PopUpNotification} from "@/components/PopUpNotification";
import ImageSeries from "@/components/games/ArrowChallenge/ImageSeries";
import {StaticImageData} from "next/image";
import blue_circle from "@/public/oddOneOut/blue-circle.webp";
import bee from "@/public/oddOneOut/bee.webp";
import oddPanda from "@/public/oddOneOut/odd_panda.png";
import {LevOneAndLevTwo} from "@/components/games/OddOneOut/LevOneAndLevTwo";
import green_circle from "@/public/oddOneOut/green-circle.webp";
import basketBall from "@/public/oddOneOut/basketball.webp";
import {LevThree} from "@/components/games/OddOneOut/LevThree";
import evenPanda from "@/public/oddOneOut/even_panda.png";

interface Props{
    id:string
}

export const ArrowChallenge = ({id}:Props) => {

    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [num, setNum] = useState(0);
    const [initialTime, setInitialTime] = useState(20);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");


    const sendData = (acc: boolean) => {
        sound.play();
        setGameOver(true);
        axios
            .post("/api/game-over", {
                gameId: id,
                timeTaken: initialTime - time + 1,
                level: gameLev,
                maximum: 1,
                accuracy: acc ? 1 : 0,
            })
            .then(() => {

                setDialogBox(true);
                setAccuracy((acc ? 1 : 0)*100)
                setNum((acc ? 1 : 0)*5);
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
            setMessage("Completed")
            setGameOver(false);
            router.push("/dashboard");
        }
    }


    return (
        <div>
      <span
          className={"text-2xl pb-4 font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
        The Arrow Challenge
      </span>
            <div className={"m-4 flex flex-row align-middle items-center justify-around "}>
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
            <ImageSeries handleClicked={sendData} gameLev={gameLev}/>

            <PopUpNotification display={dialogBox} title={"The Arrow Challenge"} message={message}
                               num={num}
                               over={gameOver}
                               accuracy={accuracy}
                               time={initialTime - time}
                               buttonOnClick={() => startGame()}/>
        </div>
    );
};