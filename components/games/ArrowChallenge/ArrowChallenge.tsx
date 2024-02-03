"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {sound} from "@/components/context/PlaySound";
import axios from "axios";
import {Counter} from "@/components/Counter";
import {PopUpNotification} from "@/components/PopUpNotification";
import ImageSeries from "@/components/games/ArrowChallenge/ImageSeries";


import {GameInstruction} from "@/components/GameInstruction";
import {ExitGameButton} from "@/components/ExitGameButton";

interface Props {
    id: string
}

export const ArrowChallenge = ({id}: Props) => {

    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    const [key, setKey] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [num, setNum] = useState(0);
    const [initialTime, setInitialTime] = useState(6000);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");
    const [instruction, setInstruction] = useState(true);


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
                setTimeout(() => {
                    setMessage("You Have Completed Level " + gameLev)

                    setDialogBox(true);
                    setNum((acc ? 5 : 1));
                    setGameLev(gameLev + 1);
                }, 2000)



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
            router.push("/analysis");
        }
    }


    return (
        <div className={" flex flex-col items-center justify-evenly h-full"}>
            <ExitGameButton/>
            {instruction &&
                <GameInstruction
                    dialog={instruction}
                    dialogChange={() => setInstruction(false)}
                    gameName={"the arrow challenge"}
                    instructions={["You need to identify and click on " +
                    "the arrow which faces the opposite direction among a fleet of arrows moving across the screen"
                    ]}
                />}
            {!instruction && <>
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
            </>
            }
        </div>
    );
};