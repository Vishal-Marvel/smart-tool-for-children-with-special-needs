"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

interface Props {
    id: string
}

// ... (other imports and constants)

export const TicTacToeGame = ({id}: Props) => {
    const router = useRouter();
    let count = 1;
    const [xTurn, setXTurn] = useState(true);
    const [won, setWon] = useState(false);
    const [wonCombo, setWonCombo] = useState([]);
    const [gameOverChk, setGameOverChk] = useState(false);
    const [boardData, setBoardData] = useState({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
    });
    const [isDraw, setIsDraw] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const WINNING_COMBO = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    useEffect(() => {
        checkWinner();
        wait(100).then(checkDraw);
    }, [boardData]);

    const updateBoardData = (idx) => {
        if (!boardData[idx] && !won) {
            let value = xTurn ? "X" : "O";
            setBoardData({...boardData, [idx]: value});
            setXTurn(!xTurn);
        }
    };

    const wait = async (milliseconds: number): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    };

    const doAI = () => {
        if (won) {
            return;
        }

        let idx, count = 0;
        while (true) {
            idx = Math.floor(Math.random() * 9);
            count += 1;
            if (!boardData[idx] && !won || count > 9) {
                break;
            }
        }

        updateBoardData(idx);
    };

    useEffect(() => {
        wait(200).then(() => {
            if (!xTurn && !won && !isDraw && modalTitle === "") {
                doAI();
            }
        });
    }, [xTurn]);

    const checkDraw = () => {
        let check = Object.keys(boardData).every((v) => boardData[v]);
        setIsDraw(check);
        if (check) {
            setModalTitle("Match Draw!!!");
            gameOver();
        }
    };

    const checkWinner = () => {
        WINNING_COMBO.map((bd) => {
            const [a, b, c] = bd;
            if (
                boardData[a] &&
                boardData[a] === boardData[b] &&
                boardData[a] === boardData[c]
            ) {
                setWon(true);
                setWonCombo([a, b, c]);
                setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`);
                gameOver();
                return;
            }
        });
    };

    const reset = () => {
        setBoardData({
            0: "",
            1: "",
            2: "",
            3: "",
            4: "",
            5: "",
            6: "",
            7: "",
            8: "",
        });
        setXTurn(true);
        setWon(false);
        setGameOverChk(false);
        count = 1;
        setWonCombo([]);
        setIsDraw(false);
        setModalTitle("");
    };

    const gameOver = () => {
        if (count === 1 && won) {
            axios.post("/api/game-over", {
                gameId: id,
                moves: 5,
                maxMoves: 5,
            }).then((r) => {
                reset();
                count -= 1;
                router.push("/games/guess-the-number");
            });
        }
    };

    return (
        <div>
            <span className={"flex justify-center text-3xl font-bold text-center w-screen p-4"}>Tic Tac Toe</span>
            <div className="game">
                <div className="game__board p-4">
                    {[...Array(9)].map((v, idx) => {
                        return (
                            <div
                                onClick={() => {
                                    updateBoardData(idx);
                                }}
                                key={idx}
                                className={`square ${
                                    wonCombo.includes(idx) ? "highlight" : ""
                                }`}
                            >
                                {boardData[idx]}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={`modal ${modalTitle ? "show" : ""}`}>
                <div className="modal__title">Game Over</div>
            </div>
        </div>
    );
};
