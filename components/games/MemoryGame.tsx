"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

import axios from "axios";
import Image from "next/image";


import robot from "@/public/memory/robot.webp"
import alien from "@/public/memory/alien.webp"
import ghost from "@/public/memory/ghost.webp"
import clown from "@/public/memory/clown.webp"
import penguin from "@/public/memory/penguin.webp"
import peacock from "@/public/memory/peacock.webp"
import smile from "@/public/memory/smile.webp"
import rocket from "@/public/memory/rocket.webp"

import {PopUpNotification} from "@/components/PopUpNotification";

import {Counter} from "@/components/Counter";
import {cn} from "@/lib/utils";
import {GameInstruction} from "@/components/GameInstruction";
import {ExitGameButton} from "@/components/ExitGameButton";
import {sound} from "@/components/context/PlaySound";

interface Props {
    id: string
}

export const MemoryGame = ({id}: Props) => {
    const router = useRouter();
    const [board, setBoard] = useState(
        [robot, alien, ghost, clown, penguin, peacock, smile, rocket]);
    const [boardData, setBoardData] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    const [time, setTime] = useState(0);
    const [initialTime, setInitialTime] = useState(6000);
    const [gameLev, setGameLev] = useState(1);
    const [message, setMessage] = useState("");
    const [key, setKey] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [num, setNum] = useState(0);
    const [instruction, setInstruction] = useState(true);


    useEffect(() => {
        if (gameLev == 1 && matchedCards.length === 4) {
            setGameOver(true);
        } else if (gameLev == 2 && matchedCards.length === 16) {
            setGameOver(true);

        } else if (gameLev == 3 && matchedCards.length === 36) {
            setGameOver(true);

        }
    }, [moves]);

    const initialize = () => {
        shuffle();
        setGameOver(false);
        setFlippedCards([]);
        setMatchedCards([]);
        setMoves(0);
    };
    const shuffle = () => {
        let shuffledCards
        if (gameLev === 1) {
            shuffledCards = [...board.slice(0, 2), ...board.slice(0, 2)];
        } else if (gameLev === 2) {
            shuffledCards = [...board, ...board];
        } else if (gameLev === 3) {
            shuffledCards = [...board, ...board, ...board, ...board, ...board.slice(0, 2), ...board.slice(0, 2)];
        }


        shuffledCards
            .sort(() => Math.random() - 0.5)
            .map((v) => v);
        setBoardData(shuffledCards);
    };

    const updateActiveCards = (i) => {
        if (!flippedCards.includes(i)) {
            if (flippedCards.length == 1) {
                const firstIdx = flippedCards[0];
                const secondIdx = i;
                if (boardData[firstIdx] == boardData[secondIdx]) {
                    setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
                }

                setFlippedCards([...flippedCards, i]);
            } else if (flippedCards.length == 2) {
                setFlippedCards([i]);
            } else {
                setFlippedCards([...flippedCards, i]);
            }

            setMoves((v) => v + 1);
        }
    };
    const completeGame = () => {
        if (gameOver === true) {
            sound.play();
            const maximum = gameLev == 1 ? 4 : gameLev === 2 ? 16 : 36
            let accuracy;
            if (moves <= (maximum * (1.5)))
                accuracy = 5
            else if (moves <= (maximum * 2))
                accuracy = 4
            else if (moves <= (maximum * (2.5)))
                accuracy = 3
            else if (moves <= (maximum * 3))
                accuracy = 2
            else accuracy = 1



            axios.post("/api/game-over", {
                gameId: id,
                level: gameLev,
                accuracy: accuracy,
                maximum: 5,
                timeTaken: initialTime - time
            })
                .then(() => {
                    setTimeout(() => {
                        setDialogBox(true)
                        setMessage("You Have Completed Level " + gameLev + "");
                        setAccuracy(accuracy / 5 * 100)
                        setNum(accuracy);
                        setGameLev(gameLev + 1);
                    }, 2000)
                    // clearInterval(timer);
                })

        }
    }
    const startGame = () => {
        sound.stop();
        setMessage("");

        if (gameLev <= 3) {

            setKey(key + 1);
            // setGameOver(false);
            setDialogBox(false);
            initialize();

        } else {
            setGameOver(false);
            setMessage("Completed")
            router.push("/games/odd-one-out");
        }
    }

    useEffect(() => {
        completeGame();

    }, [gameOver])
    useEffect(() => {
        initialize();

    }, [])


    return (

        <div className={" flex flex-col items-center justify-evenly h-full"}>
            <ExitGameButton/>
            {instruction &&
                <GameInstruction
                    dialog={instruction}
                    dialogChange={() => setInstruction(false)}
                    gameName={"PAIR THE HIDDEN OBJECT"}
                    instructions={["You need to click on the circle to see the object",
                        "Only two circle will be open at a given time",
                        "You need to use your memory to memorize the location of the object and pair them"
                    ]}
                />}
            {!instruction && <>

                <span className={"text-center font-semibold text-2xl capitalize"}>PAIR THE HIDDEN OBJECT</span>
                <div className="text-center">
                    <Counter

                        restart={key}
                        isPlaying={!gameOver}
                        onCompleteFunc={() => setGameOver(true)}
                        onUpdateFunc={(remainingTime) => setTime(remainingTime)}
                        time={initialTime}
                    />
                    <span
                        className={"text-indigo-950 dark:text-indigo-50 text-2xl font-bold uppercase "}> Level - {gameLev}
                    </span>
                </div>
                <div className="text-center">

                    <div
                        className={cn("board w-full h-full", gameLev === 1 ? "grid-cols-2" : gameLev === 2 ? "grid-cols-4" : "grid-cols-6")}>

                        {boardData.map((data, i) => {
                            const flipped = flippedCards.includes(i);
                            const matched = matchedCards.includes(i);
                            return (
                                <div
                                    onClick={() => {
                                        updateActiveCards(i);
                                    }}
                                    key={i}
                                    className={`card w-[75px] ${flipped || matched ? "active" : ""} ${
                                        matched ? "matched" : ""
                                    } ${gameOver ? "gameover" : ""}`}
                                >
                                    <div className="card-front object-cover pl-1">
                                        <Image src={data} alt={"Image"} height={70} width={70}/>
                                    </div>
                                    <div className="card-back"></div>
                                </div>
                            );
                        })}
                    </div>

                </div>
                <PopUpNotification display={dialogBox} title={"Memory Game"}
                                   message={message}
                                   num={num}
                                   over={gameOver}
                                   accuracy={accuracy}
                                   time={initialTime - time}
                                   buttonOnClick={startGame}/>
            </>
            }
        </div>
    );
}