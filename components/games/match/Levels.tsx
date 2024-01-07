"use client"
import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface ImageData {
    question: StaticImageData;
    answer: StaticImageData;
}

interface Props {
    q1l1: StaticImageData,
    q2l1: StaticImageData,
    a1l1: StaticImageData,
    a2l1: StaticImageData,
    q1l2: StaticImageData,
    q2l2: StaticImageData,
    q3l2: StaticImageData,
    a1l2: StaticImageData,
    a2l2: StaticImageData,
    a3l2: StaticImageData,
    lev: number
    q1l3: StaticImageData,
    q2l3: StaticImageData,
    q3l3: StaticImageData,
    q4l3: StaticImageData,

    a1l3: StaticImageData,
    a2l3: StaticImageData,
    a3l3: StaticImageData,
    a4l3: StaticImageData,

    timeup: boolean
    handleOnDraw
}


export const Levels = ({
                           q1l1,
                           q2l1,
                           a1l1,
                           a2l1,
                           q1l2,
                           q2l2,
                           q3l2,
                           a1l2,
                           a2l2,
                           a3l2,
                           lev,
                           q1l3,
                           q2l3,
                           q3l3,
                           q4l3,
                           a1l3,
                           a2l3,
                           a3l3,
                           a4l3,
                           handleOnDraw,
                           timeup
                       }: Props) => {
    const [shuffledImages1, setShuffledImages1] = useState<StaticImageData[]>([]);
    const [shuffledImages2, setShuffledImages2] = useState<StaticImageData[]>([]);
    const [shuffledImages3, setShuffledImages3] = useState<StaticImageData[]>([]);
    const [lev1questions, setLev1questions] = useState([q1l1, q2l1]);
    const [lev2questions, setLev2questions] = useState([q1l2, q2l2, q3l2]);
    const [lev3questions, setLev3questions] = useState([q1l3, q2l3, q3l3, q4l3]);

    const [columnA, setColumnA] = useState<StaticImageData>(null);
    const [columnB, setColumnB] = useState<StaticImageData>(null);
    const [selected, setSelected] = useState<StaticImageData[]>([]);
    const [pairs, setPairs] = useState<ImageData[]>([]);
    const handleSelect = (column, img) => {
        if (column === "A") {
            if (!selected.includes(img)) {
                setColumnA(img);
            }
        } else if (column === "B" && columnA !== null) {
            setColumnB(img);
            // handleOnDraw(columnA, columnB);
            if (!selected.includes(img)) {
                setSelected([...selected, columnA, img]);
                const newPair: ImageData = {question: columnA, answer: img}
                setPairs([...pairs, newPair])
                setColumnA(null);
                setColumnB(null);
            }

        }
    }
    useEffect(() => {
        if (lev === 1 && pairs.length == 2) {
            handleOnDraw(pairs);
            setPairs([]);
        }
        if (lev === 2 && pairs.length == 3) {
            handleOnDraw(pairs);
            setPairs([]);

        }
        if (lev === 3 && pairs.length == 4) {
            handleOnDraw(pairs);
            setPairs([]);
        }


    }, [pairs]);
    useEffect(() => {
        if (timeup === true) {
            handleOnDraw(pairs);
        }
    }, [timeup])

    useEffect(() => {

        const imageArray = [a1l1, a2l1];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages1(shuffledArray);
    }, []);
    useEffect(() => {

        const imageArray = [a1l2, a2l2, a3l2];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages2(shuffledArray);
    }, []);
    useEffect(() => {
        const imageArray = [a1l3, a2l3, a3l3, a4l3];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages3(shuffledArray);
    }, []);
    useEffect(() => {

        const imageArray = lev1questions;
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setLev1questions(shuffledArray);
    }, []);
    useEffect(() => {

        const imageArray = lev2questions;
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setLev2questions(shuffledArray);
    }, []);
    useEffect(() => {
        const imageArray = lev3questions;
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setLev3questions(shuffledArray);
    }, []);

    return (
        <div className={"w-full flex flex-col justify-center items-center"}>
            <div className={"flex flex-row w-full justify-evenly p-2 font-bold text-2xl"}>
                <span>Column A </span>
                <span>Column B </span>
            </div>
            {lev === 1 ? <div className={"flex flex-row w-full justify-evenly m-3"}>
                <div className={"flex flex-col"}>
                    {lev1questions.map((qn, index) => (

                        <Image src={qn} alt={`${index}`}
                               className={cn("m-2 transition-all ease-in cursor-pointer", selected.includes(qn) ? "scale-50" : "",
                                   columnA === qn ? "scale-125" : "")}
                               onClick={(e) => handleSelect("A", qn)}/>

                    ))}
                </div>
                <div className={"flex flex-col"}>
                    {shuffledImages1.map((qn, index) => (

                        <Image src={qn} alt={`${index}`}
                               className={cn("m-2 transition-all ease-in cursor-pointer", selected.includes(qn) ? "scale-50" : "",
                                   columnB === qn ? "scale-125" : "")}
                               onClick={(e) => handleSelect("B", qn)}/>

                    ))}
                </div>


            </div> : lev === 2 ? <div className={"flex flex-row w-full justify-evenly m-3"}>
                <div className={"flex flex-col"}>
                    {lev2questions.map((qn, index) => (

                        <Image src={qn} alt={`${index}`}
                               className={cn("h-[120px] w-[100px]  m-1 transition-all ease-in cursor-pointer", selected.includes(qn) ? "scale-50" : "",
                                   columnA === qn ? "scale-125" : "")}
                               onClick={(e) => handleSelect("A", qn)}/>

                    ))}
                </div>
                <div className={"flex flex-col"}>
                    {shuffledImages2.map((qn, index) => (
                        <Image src={qn} alt={`${index}`}
                               className={cn("h-[120px] w-[100px] m-1 transition-all ease-in cursor-pointer", selected.includes(qn) ? "scale-50" : "",
                                   columnB === qn ? "scale-125" : "")}
                               onClick={(e) => handleSelect("B", qn)}/>

                    ))}
                </div>


            </div> : lev == 3 ? <div className={"flex flex-row  justify-evenly m-3"}>
                <div className={"grid grid-cols-1 md:grid-cols-2"}>
                    {lev3questions.map((qn, index) => (
                        <Image src={qn} alt={`${index}`}

                               className={cn("m-2 transition-all ease-in cursor-pointer", selected.includes(qn) ? "scale-50" : "",
                                   columnA === qn ? "scale-125" : "")}
                               onClick={(e) => handleSelect("A", qn)}/>
                    ))}
                </div>
                <div className={"grid md:grid-cols-2"}>
                    {shuffledImages3.map((qn, index) => (

                        <Image src={qn} alt={`${index}`}
                               className={cn("m-2 transition-all ease-in cursor-pointer", selected.includes(qn) ? "scale-50" : "",
                                   columnB === qn ? "scale-125" : "")}
                               onClick={(e) => handleSelect("B", qn)}/>

                    ))}
                </div>


            </div> : <div></div>}

        </div>
    );
};