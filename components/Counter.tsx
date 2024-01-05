"use client"
import React from "react";
import {CountdownCircleTimer} from "react-countdown-circle-timer";

import "./styles.css";
import {cn} from "@/lib/utils";

interface Props {
    restart?: number
    time: number,
    size?: number,
    isPlaying: boolean,
    onCompleteFunc: () => void,
    onUpdateFunc: (remainingTime: number) => void
}

const renderTime = ({remainingTime}) => {

    if (remainingTime >= 60) {
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = (remainingTime % 60)

        return (
            <div className={"time-wrapper"}>
                <div className={"time"}>
                    {minutes}:{seconds}
                </div>
            </div>
        )
    } else {
        return (
            <div className={"time-wrapper"}>
                <div className={cn("time", remainingTime <= 10 && "time-effect")}>
                    {remainingTime}
                </div>
            </div>
        );
    }

};


export const Counter = ({restart, time, isPlaying, size, onCompleteFunc, onUpdateFunc}: Props) => {
    return (
        <div className="App">
            <div className="timer-wrapper">
                <CountdownCircleTimer
                    key={restart ? restart : 0}
                    isPlaying={isPlaying}
                    size={size ? size : 100}
                    onComplete={onCompleteFunc}
                    onUpdate={onUpdateFunc}
                    duration={time}
                    colors={['#0a7bc7', '#F7B801', '#f42020', '#A30000',
                        '#3464a7', '#60c73d', '#000000']}
                    colorsTime={[time, time * (2 / 3), time * (1 / 3), 8, 5, 3, 0]}
                >
                    {renderTime}
                </CountdownCircleTimer>
            </div>
        </div>
    );
}
