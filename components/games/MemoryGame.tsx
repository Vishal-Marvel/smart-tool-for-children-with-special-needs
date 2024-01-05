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

import sound from "@/components/context/PlaySound";
import {Counter} from "@/components/Counter";
import {cn} from "@/lib/utils";

interface Props {
    id: string
}

export const MemoryGame = ({id}: Props) => {
    const router = useRouter();
    const [board,setBoard] = useState([robot, alien, ghost, clown, penguin, peacock, smile, rocket]);

    const [boardData, setBoardData] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    const [time, setTime] = useState(0);
    const [initialTime, setInitialTime] = useState(180);
    const [gameLev , setGameLev] = useState(1);
    const [message, setMessage] = useState("");
    const [key, setKey] = useState(0);
    useEffect(() => {

        initialize();

    }, []);


    useEffect(() => {
        if (matchedCards.length === 16) {
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
        let shuffledCards = [...board, ...board];

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
    const completeGame = ()=>{
        if (gameOver === true) {

            if (time > 0) sound.play();
            axios.post("/api/game-over", {
                gameId: id,
                level: gameLev,
                accuracy: matchedCards.length,
                maximum: 16,
                timeTaken: initialTime - time
            })
                .then(()=>{
                    setDialogBox(true)
                    setMessage("You Have Completed Level "+ gameLev);

                    setGameLev(gameLev+1);

                })

        }
    }
    const startGame = () => {
        setMessage("");

        if (gameLev <= 3) {
            setKey(key + 1);
            // setGameOver(false);
            setDialogBox(false);
             if (gameLev==2){
                setInitialTime(120)
            }
            else if (gameLev==3){
                setInitialTime(80);
            }
            initialize();

        } else {
            setMessage("Completed")
            router.push("/games/odd-one-out");
        }
    }


    useEffect(()=>{
        completeGame();

    },[gameOver])


    return (

        <div className={"justify-center justify-items-center flex flex-col"}>

            <span className={"text-center font-semibold text-2xl"}>Memory Game</span>
            <div className="container">
                <div className="menu">
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

                <div className={cn("board")}>

                    {boardData.map((data, i) => {
                        const flipped = flippedCards.includes(i);
                        const matched = matchedCards.includes(i);
                        return (
                            <div
                                onClick={() => {
                                    updateActiveCards(i);
                                }}
                                key={i}
                                className={`card ${flipped || matched ? "active" : ""} ${
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
                               buttonOnClick={startGame}/>

        </div>
    );
}