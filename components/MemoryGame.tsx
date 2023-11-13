"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
interface Props{
    id:string
}
export const MemoryGame = ({id}: Props) => {
    const router = useRouter();
    const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];

    const [boardData, setBoardData] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

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
            await axios.post("/api/game-over", {
                gameId: id,
                moves,
                maxMoves: 16
            })
            alert("Game Completed");
            router.push("/games/tic-tac-toe")
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
                                <div className="card-front">{data}</div>
                                <div className="card-back"></div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}