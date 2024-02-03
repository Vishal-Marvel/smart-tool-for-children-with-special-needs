// ImageSeries.js
"use client"
import styles from './ImageSeries.module.css';
import left from "@/public/arrow/left.png";
import right from "@/public/arrow/right.png";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";

interface Props {
    handleClicked: (img) => void;
    gameLev: number
}

const ImageSeries = ({handleClicked, gameLev}: Props) => {
    const array = Array.from({length: 10});
    const [randomNumberRow, setRandomNumberRow] = useState(0);
    const [randomNumberCol, setRandomNumberCol] = useState(0);
    useEffect(() => {
        setRandomNumberRow(Math.floor(Math.random() * 10) )
        setRandomNumberCol(Math.floor(Math.random() * 7) )
    }, [gameLev])


    return (
        <div className={"w-full flex justify-center "}>
            <div className={"h-fit w-full"}>
                <div className={cn("max-w-[60vw] overflow-hidden")}>
                    <ul className={cn("flex-nowrap w-fit flex gap-[1rem]", gameLev == 1 ? styles.imageSeries : gameLev == 2 ? styles.imageSeries1 : styles.imageSeries2)}>
                        {array.map((row, indexR) => (
                            <li className={"flex flex-col gap-2"}>
                                {array.slice(2).map((col, indexC) => (
                                    <Image onClick={() => handleClicked(indexR == randomNumberRow && indexC == randomNumberCol)}
                                           src={indexR == randomNumberRow && indexC == randomNumberCol ? left : right}
                                           className={"cursor-pointer min-h-[15px] min-w-[80px]"} alt={`Image ${row} ${col}`}/>
                                ))}

                            </li>
                        ))}
                        {array.map((row, indexR) => (
                            <li className={"flex flex-col gap-2"}>
                                {array.slice(2).map((col, indexC) => (
                                    <Image onClick={() => handleClicked(indexR == randomNumberRow && indexC == randomNumberCol)}
                                           src={indexR == randomNumberRow && indexC == randomNumberCol ? left : right}
                                           className={"cursor-pointer min-h-[15px] min-w-[80px]"} alt={`Image ${row} ${col}`}/>
                                ))}

                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ImageSeries;
