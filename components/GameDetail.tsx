"use client"
import qs from "query-string";
import {useEffect, useState} from "react";
import {Game, User_Game} from "@prisma/client";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);


interface Props {
    game: Game,
    userId: string
}

export const GameDetail = ({game, userId}: Props) => {
    const [gameData, setGameData] = useState<User_Game[]>([]);
    const [time, setTime] = useState<number[]>([]);
    const [accuracy, setAccuracy] = useState<number[]>([]);

    const getData = async () => {
        for (let i = 1; i < 4; i++) {
            const url = qs.stringifyUrl({
                url: "/api/getData",
                query: {
                    userId,
                    gameId: game.id,
                    level: i
                }
            });
            const data: User_Game = (await axios.get(url)).data[0];
            // console.log(data)

            if (data != undefined) {
                setGameData(prevState => {
                    if (prevState.find((prev) => prev.id === data.id)) {
                        return prevState;
                    } else {
                        return [...prevState, data];
                    }
                });
            }
        }
    };

    useEffect(() => {
        getData().then();
    }, []);

    useEffect(() => {
        // This effect runs whenever gameData changes
        const sortedGameData = gameData.sort((a, b) => a.level - b.level);

        const times = sortedGameData.map(data => data.timeTaken);
        const accuracies = sortedGameData.map(data => (data.accuracy / data.maximum) * 100);

        setTime(times);
        setAccuracy(accuracies);

    }, [gameData]);

    return (
        <div className={"w-full m-2 p-3"}>
            <span className={"text-2xl font-bold uppercase ml-10 m-3 p-3"}>{game.name}</span>
            <div className={"w-[97%] flex justify-evenly"}>
                <div className={"w-1/3"}>
                    <Bar
                        className={"h-[350px] w-[500px]"}
                        data={{
                            labels: ["Level 1", "Level 2", "Level 3"],
                            datasets: [
                                {
                                    label: "Time",
                                    data: time,
                                    backgroundColor: "blue",
                                    borderColor: "orange",
                                    borderWidth: 2
                                }
                            ]
                        }}
                        width={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <div className={"w-1/3 "}>
                    <Bar
                        className={"h-[350px] w-[500px]"}
                        data={{
                            labels: ["Level 1", "Level 2", "Level 3"],
                            datasets: [
                                {
                                    label: "Accuracy",
                                    data: accuracy,
                                    backgroundColor: "purple",
                                    borderColor: "red",
                                    borderWidth: 2
                                }
                            ]
                        }}
                        width={50}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </div>
            </div>
            <div className={"text-center"}>
                <span className={"text-center "}>{game.graphStatement}</span>
            </div>
        </div>
    );
};
