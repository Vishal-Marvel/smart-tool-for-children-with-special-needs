"use client";

import {useEffect, useState} from "react";
import Scores from "./Scores";
import Round from "./Round";
import GameView from "./GameView";
import Controller from "./Controller";
import {randomPcMove} from "./randomPcMove";
import {useGameContext} from "../context/gameContext";
import BombAnimation from "./BombAnimation";
import axios from "axios";
import {useRouter} from "next/navigation";

interface Props {
    id: string
}

export const RPSGame = ({id}: Props) => {
    const router = useRouter();
    const {state, dispatch} = useGameContext();
    const [disabled, setDisabled] = useState(false);

    // handle pc Move after user clicked on controller button
    const pcMoveHandler = () => {
        const {title, image} = randomPcMove();
        // set in state
        dispatch({type: "SET_PC_IMAGE", payload: image});
        dispatch({type: "SET_PC_SYMBOL", payload: title});
        dispatch({type: "INCREMENT_ROUND"});
    };

    // point the winner after each round
    const determineWinner = (user: string, pc: string) => {
        // check equal user and pc
        if (user === pc) {
            return dispatch({type: "INCREMENT_GAME_TIES"});
        }

        // condition for win the user
        // and else pc is winner
        if (
            (user === "rock" && pc === "scissor") ||
            (user === "paper" && pc === "rock") ||
            (user === "scissor" && pc === "paper")
        ) {
            return dispatch({type: "INCREMENT_USER_SCORE"});
        }

        return dispatch({type: "INCREMENT_PC_SCORE"});
    };

    // every change user and pc selection call determineWinner function
    useEffect(() => {
        const {userSelect, pcSelect} = state;
        if (userSelect && pcSelect) {
            determineWinner(userSelect, pcSelect);
        }
        if (state.roundCounter >= 10) {
            setDisabled(true);
            completeGame()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.roundCounter]);

    const completeGame = () => {
        if (state.roundCounter >= 10) {
            axios.post("/api/game-over", {
                gameId: id,
                moves: state.userScore + state.gameTies,
                maxMoves: 10
            }).then(r => {
                alert("Game Over")

                router.push("/dashboard")
                dispatch({type: "RESET"});
            })

        }
    }
    return (
        <div className="w-full min-h-[95vh] flex flex-col select-none relative">
            <Scores/>
            <Round round={state.roundCounter}/>
            <GameView/>
            <Controller pcMove={pcMoveHandler} disabled={disabled}/>
            <BombAnimation/>
        </div>
    );
}

