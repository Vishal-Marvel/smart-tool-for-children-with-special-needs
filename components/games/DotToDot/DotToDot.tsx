"use client"
import React, {useEffect, useState} from "react";
import "./DOT.css";
import {Counter} from "@/components/Counter";
import l1 from "@/public/dotToDot/l1.png"
import l2 from "@/public/dotToDot/l2.png"
import l3_1 from "@/public/dotToDot/l3a2.png"
import l3_2 from "@/public/dotToDot/l3a4.png"

import {PopUpNotification} from "@/components/PopUpNotification";
import {useRouter} from "next/navigation";
import {Comp} from "@/components/games/DotToDot/Comp";
import Image from "next/image";
import axios from "axios";

interface Props{
    id: string
}

export const DotToDot = ({id}:Props) => {
    const router = useRouter();
    const [gameOver, setGameOver] = useState(false);
    const [gameLev, setGameLev] = useState(1);
    const [time, setTime] = useState(0);
    let score=0, count=0;
    const [key, setKey] = useState(0);
    const [initialTime, setInitialTime] = useState(15);
    const [dialogBox, setDialogBox] = useState(false);
    const [message, setMessage] = useState("");
    const [timeUp, setTimeUp] = useState(false);
    const lev1 = {
        "0,0,0": 1,
        "0,0,1": 0,
        "0,1,0": 0,
        "0,1,1": 1,
        "0,2,0": 0,
        "0,2,1": 0,
        "1,0,0": 0,
        "1,0,1": 0,
        "1,1,0": 1,
        "1,1,1": 0,
        "1,2,0": 0,
        "1,2,1": 1
    }
    const lev2 = [
        {
            "0,0,0": 1,
            "0,0,1": 0,
            "0,1,0": 0,
            "0,1,1": 1,
            "0,2,0": 0,
            "0,2,1": 0,
            "1,0,0": 0,
            "1,0,1": 0,
            "1,1,0": 1,
            "1,1,1": 0,
            "1,2,0": 0,
            "1,2,1": 1
        }, {
        "0,0,0": 0,
        "0,0,1": 0,
        "0,1,0": 1,
        "0,1,1": 0,
        "0,2,0": 0,
        "0,2,1": 1,
        "1,0,0": 0,
        "1,0,1": 0,
        "1,1,0": 1,
        "1,1,1": 1,
        "1,2,0": 0,
        "1,2,1": 0
    }]
    const lev3 = [
        {
            "0,0,0": 1,
            "0,0,1": 0,
            "0,1,0": 0,
            "0,1,1": 1,
            "0,2,0": 0,
            "0,2,1": 0,
            "1,0,0": 0,
            "1,0,1": 0,
            "1,1,0": 1,
            "1,1,1": 0,
            "1,2,0": 0,
            "1,2,1": 1
        }, {
            "0,0,0": 0,
            "0,0,1": 0,
            "0,1,0": 1,
            "0,1,1": 0,
            "0,2,0": 0,
            "0,2,1": 1,
            "1,0,0": 0,
            "1,0,1": 0,
            "1,1,0": 1,
            "1,1,1": 1,
            "1,2,0": 0,
            "1,2,1": 0
        },
        {
        "0,0,0": 0,
        "0,0,1": 0,
        "0,1,0": 0,
        "0,1,1": 1,
        "0,2,0": 1,
        "0,2,1": 0,
        "1,0,0": 0,
        "1,0,1": 1,
        "1,1,0": 1,
        "1,1,1": 0,
        "1,2,0": 0,
        "1,2,1": 0
    },{
        "0,0,0": 1,
        "0,0,1": 0,
        "0,1,0": 0,
        "0,1,1": 1,
        "0,2,0": 1,
        "0,2,1": 0,
        "1,0,0": 0,
        "1,0,1": 0,
        "1,1,0": 0,
        "1,1,1": 0,
        "1,2,0": 1,
        "1,2,1": 0
    }

    ]
    function deepEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    const handleDone = (any, level, qn)=>{

        if (level==1){
            if (deepEqual(any, lev1)){
                score = 1;
            }

            setGameOver(true);
            sendData();
        }else if(level==2){
            // console.log(deepEqual(any, lev2[qn-1]), any, lev2[qn-1])
            if (deepEqual(any, lev2[qn-1])){
               score +=1;

            }
            count+=1
            if (count==2){
                setGameOver(true);
                sendData();
            }
        }else if(level==3){
            // console.log(deepEqual(any, lev3[qn-1]), any, lev3[qn-1])
            if (deepEqual(any, lev3[qn-1])){
                score+=1

            }
            count+=1
            if (count==4){
                setGameOver(true);
                sendData();
            }
        }
    }
    const sendData = () => {
        console.log(score);
        axios
            .post("/api/game-over", {
                gameId: id,
                timeTaken: initialTime - time ,
                level: gameLev,
                accuracy: score,
            })
            .then(() => {
                setMessage("You Have Completed Level "+gameLev)
                setDialogBox(true);
                setGameLev(gameLev + 1);
                score=0
                count=0
                setTimeUp(false);
            })
            .catch((e) => console.log(e));
    };

    const startGame = () => {
        setMessage("");
        if (gameLev <= 3) {
            setKey(key + 1);
            setGameOver(false);
            setDialogBox(false);
            if (gameLev==3){
                setInitialTime(30);
            }
        } else {
            router.push("/games/distance");
        }
    }
    return (
        <div className={"w-full flex flex-col justify-center align-middle items-center"}>
      <span
          className={"text-2xl pb-4 font-bold uppercase text-indigo-950 dark:text-indigo-50 text-center flex justify-center"}>
        Match the image
      </span>
            <div className={"w-1/2 m-4 flex flex-row align-middle items-center justify-evenly "}>
                <Counter
                    restart={key}
                    isPlaying={!gameOver}
                    onCompleteFunc={() => {
                        // setMessage("Time Up");
                        setTimeUp(true);
                    }}
                    onUpdateFunc={(remainingTime) => setTime(remainingTime)}
                    time={initialTime}
                />
                <span
                    className={"text-indigo-950 dark:text-indigo-50 text-2xl font-bold uppercase "}>
                    Level - {gameLev}
                </span>
            </div>
            <div className={"justify-center justify-items-center align-middle"}>
                {gameLev===1 &&

                    <Comp img={l1} handleDone={(any)=>handleDone(any, 1 ,1)} timeUp={timeUp}/>
                }{gameLev===2 &&
                    <div className={"flex flex-col"}>
                        <Comp img={l1} handleDone={(any)=>handleDone(any, 2, 1)} timeUp={timeUp}/>
                        <Comp img={l2} handleDone={(any)=>handleDone(any, 2, 2)} timeUp={timeUp}/>
                    </div>

                }{gameLev===3 &&
                <div className={"grid grid-cols-1 md:grid-cols-2 "}>
                    <Comp img={l1} handleDone={(any)=>handleDone(any, 3, 1)} timeUp={timeUp}/>
                    <Comp img={l2} handleDone={(any)=>handleDone(any, 3, 2)} timeUp={timeUp}/>
                    <Comp img={l3_1} handleDone={(any)=>handleDone(any, 3, 3)} timeUp={timeUp}/>
                    <Comp img={l3_2} handleDone={(any)=>handleDone(any, 3, 4)} timeUp={timeUp}/>
                </div>
                }

            </div>
            <PopUpNotification display={dialogBox} title={"Game Over"} message={message}
                               buttonOnClick={() => {startGame()}}/>
        </div>

    );
}

