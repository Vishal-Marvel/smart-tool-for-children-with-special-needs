"use client"
import qs from "query-string";
import {useEffect, useState} from "react";
import {Game, User_Game} from "@prisma/client";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


Chart.register(CategoryScale);


interface Props {
    game: Game,
    userId: string
}

export const GameDetail = ({game, userId}: Props) => {
    const [gameData, setGameData] = useState<User_Game[]>([]);
    const [time, setTime] = useState<number[]>([]);
    const [accuracy, setAccuracy] = useState<number[]>([]);
    const [avgTime, setAvgTime] = useState<number>(0);
    const [avgAcc, setAvgAcc] = useState<number>(0);
    const [date, setDate] = useState("");

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
        const dates = sortedGameData.map(data => data.date);
        const accuracies = sortedGameData.map(data => (data.accuracy / data.maximum) * 100);

        const avgTime = times.length > 0 ? times.reduce((acc, time) => acc + time, 0) / times.length : 0;

        const avgAccuracy = accuracies.length > 0 ? accuracies.reduce((acc, accuracy) => acc + accuracy, 0) / accuracies.length : 0;
        const lastDate = dates.sort().reverse()
        setDate(lastDate[0] && lastDate[0].toLocaleString());

        setTime(times);
        setAccuracy(accuracies);
        setAvgAcc(avgAccuracy);
        setAvgTime(avgTime);


    }, [gameData]);


    return (
        <div>

            {gameData.length > 0 &&
                <div className={"w-[97%] m-4 border-2 rounded-2xl p-2 text-center md:text-left flex flex-col"}>
                    <span
                        className={"text-2xl font-bold uppercase md:ml-10 m-3  underline underline-offset-3"}>{game.name}</span>

                    <div className={"w-full flex md:flex-row flex-col justify-evenly"}>
                        <div className={"md:w-1/3 "}>
                            <Bar
                                className={"h-[350px] w-[500px]"}
                                data={{
                                    labels: ["Level 1", "Level 2", "Level 3"],
                                    datasets: [
                                        {
                                            label: "Time (s)",
                                            data: time,
                                            backgroundColor: "#27aeef",
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
                        <div className={"md:w-1/3 "}>
                            <Bar
                                className={"h-[350px] w-[500px]"}
                                data={{
                                    labels: ["Level 1", "Level 2", "Level 3"],
                                    datasets: [
                                        {
                                            label: "Accuracy (%)",
                                            data: accuracy,
                                            backgroundColor: "#87bc45",
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

                    <div className={"w-full flex justify-center md:m-4 mt-1 mb-1 overflow-hidden"}>
                        <Table className={"md:w-2/3 w-1/3"}>
                            <TableHeader className={"bg-secondary"}>
                                <TableRow>
                                    <TableHead>Levels</TableHead>
                                    <TableHead>No. Of Errors</TableHead>
                                    {/*<TableHead>Total</TableHead>*/}
                                    <TableHead>Time Taken (s)</TableHead>
                                    <TableHead>Accuracy (%)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {gameData.map((game, index) => (
                                    <TableRow>
                                        <TableCell>{game.level}</TableCell>
                                        <TableCell>{game.maximum - game.accuracy}</TableCell>
                                        {/*<TableCell>{game.maximum}</TableCell>*/}
                                        <TableCell>{game.timeTaken}</TableCell>
                                        <TableCell>{(game.accuracy / game.maximum * 100).toFixed(0)}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>
                    <div className={"w-full flex justify-center"}>
                        <div className={"text-center w-2/3 bg-gray-300 rounded-2xl p-4"}>
                            <span
                                className={"md:text-[16px] text-sm"}>{"The time-accuracy graph of the user states that the "}
                                <strong>{game.description}</strong>
                                {" attribute is satisfied with a average percentage and time of "}
                                <strong>{avgAcc.toFixed(1)}% </strong>
                                in <strong>{avgTime.toFixed(1)}s </strong>
                                respectively. Game Last Played At {date && date.slice(0, 10)}
                             </span>

                        </div>

                    </div>

                </div>

            }
        </div>

    );
};
