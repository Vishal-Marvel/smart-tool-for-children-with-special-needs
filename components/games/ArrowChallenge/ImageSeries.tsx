// ImageSeries.js
"use client"
import styles from './ImageSeries.module.css';
import left from "@/public/arrow/left.png";
import right from "@/public/arrow/right.png";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useEffect, useState} from "react";

interface Props{
    handleClicked:(img)=>void;
    gameLev:number
}

const ImageSeries = ({handleClicked, gameLev}: Props) => {
    const array = Array.from({length:48});
    const [randomNumber, setRandomNumber] = useState(0);
    useEffect(()=>
     {
         setRandomNumber(Math.floor(Math.random() * 48) + 1)
    }, [gameLev])

    return (
        <div className={"w-full flex justify-center "}>
            <div className={"h-fit overflow-hidden"}>
                <div className={cn(gameLev==1? styles.imageSeries:gameLev==2?styles.imageSeries1:styles.imageSeries2
                    , "grid grid-cols-8 gap-0")}>
                    {array.map((ele, index)=>(
                        <>
                        {index==randomNumber && <Image onClick={()=>handleClicked(true)} src={left} className={"cursor-pointer h-[50px] w-[100px]"} alt="Image 1"/>}
                        {index!=randomNumber && <Image onClick={()=>handleClicked(false)} src={right} className={"cursor-pointer h-[50px] w-[100px]"} alt="Image 1"/>}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageSeries;
