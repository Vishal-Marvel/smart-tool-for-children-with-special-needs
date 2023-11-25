"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import robot from "@/public/memory/robot.webp"
import alien from "@/public/memory/alien.webp"
import ghost from "@/public/memory/ghost.webp"
import clown from "@/public/memory/clown.webp"
import penguin from "@/public/memory/penguin.webp"
import peacock from "@/public/memory/peacock.webp"
import smile from "@/public/memory/smile.webp"
import rocket from "@/public/memory/rocket.webp"
import Image from "next/image";
import {PopUpNotification} from "@/components/PopUpNotification";

interface Props {
    id: string
}

export const MemoryGame = ({id}: Props) => {
    const router = useRouter();
    const board = [robot, alien, ghost, clown, penguin, peacock, smile, rocket];

    const [boardData, setBoardData] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);

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
        const shuffledCards = [...board, ...board]
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
    const completeGame = async ()=>{
        if (gameOver === true) {
            setDialogBox(true)
            await axios.post("/api/game-over", {
                gameId: id,
                moves,
                maxMoves: 16
            })

        }
    }
    useEffect(()=>{
        completeGame().then(()=>{})

    },[gameOver])


    return (
        <div className={"flex flex-col"}>
            <span className={"pb-10 text-center font-semibold text-2xl"}>Memory Game</span>

            <div className="container">
                <div className="menu">
                    <p className={"pb-3"}>{`Moves - ${moves}`}</p>
                </div>

                <div className="board">
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
            <PopUpNotification display={dialogBox} title={"Game Over"} buttonOnClick={() => router.push("/dashboard")}/>

        </div>
    );
}