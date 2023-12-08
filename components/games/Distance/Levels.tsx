"use client"
import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

interface Props {
    al1: StaticImageData,
    w1l1: StaticImageData,
    w2l1: StaticImageData,
    w3l1: StaticImageData,
    l2a1: StaticImageData,
    l2a2: StaticImageData,
    l2w1: StaticImageData,
    l1: StaticImageData,
    l2: StaticImageData,
    lev: number
    l2w2: StaticImageData,
    l2w3: StaticImageData,
    l2w4: StaticImageData,
    l2w5: StaticImageData,
    l2w6: StaticImageData,
    l3a1: StaticImageData,
    l3a2: StaticImageData,
    l3a3: StaticImageData,
    l3w1: StaticImageData,
    l3w2: StaticImageData,
    l3w3: StaticImageData,
    l3w4: StaticImageData,
    l3w5: StaticImageData,
    l3w6: StaticImageData,
    l3w7: StaticImageData,
    l3w8: StaticImageData,
    l3w9: StaticImageData,
    l3: StaticImageData,
    count: number,
    handleOnClick: (image: StaticImageData) => void
}

export const Levels = ({
    al1,
    w1l1,
    w2l1,
    w3l1,
    l2a1,
    l2a2,
    l2w1,
    l1,
    l2,
    lev,
    l2w2,
    l2w3,
    l2w4,
    l2w5,
    l2w6,
    l3a1,
    l3a2,
    l3a3,
    l3w1,
    l3w2,
    l3w3,
    l3w4,
    l3w5,
    l3w6,
    l3w7,
    l3w8,
    l3w9,
    l3,
    count,
                           handleOnClick
                       }: Props) => {
    const [shuffledImages1, setShuffledImages1] = useState<StaticImageData[]>([]);
    const [shuffledImages2, setShuffledImages2] = useState<StaticImageData[]>([]);
    const [shuffledImages3, setShuffledImages3] = useState<StaticImageData[]>([]);
    const [shuffledImages4, setShuffledImages4] = useState<StaticImageData[]>([]);
    const [shuffledImages5, setShuffledImages5] = useState<StaticImageData[]>([]);
    const [shuffledImages6, setShuffledImages6] = useState<StaticImageData[]>([]);

    useEffect(() => {

        const imageArray = [al1, w1l1, w2l1, w3l1];
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
       
        const imageArray = [l2a1,l2w1,l2w2,l2w3];
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
       
        const imageArray = [l2a2,l2w4,l2w5,l2w6];
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
       
        const imageArray = [l3a1,l3w1,l3w2,l3w3];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages4(shuffledArray);
    }, []);

    useEffect(() => {
       
        const imageArray = [l3a2,l3w4,l3w5,l3w6];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages5(shuffledArray);
    }, []);

    useEffect(() => {
        const imageArray = [l3a3,l3w7,l3w8,l3w9];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages6(shuffledArray);
    }, []);

    return (
        <div>
            <div className={"flex flex-col justify-center m-4"}>
                {lev == 1 && <Image src={l1} alt={'question'} className="md:h-50 md:w-50 h-30 w-30"/>}
                {lev==1 && <div className="mt-4">1. Which object is closer to the swing . </div>}
            </div>
           
            <div className="grid grid-cols-2 gap-10 justify-center justify-items-center align-middle">
                {lev == 1 && shuffledImages1.map((image, index) => (
                    <Image key={index} src={image} alt={`Image${index + 1}`}
                           className={"aspect-1 md:h-30 md:w-30 h-15 w-15 cursor-pointer"}
                           onClick={() => handleOnClick(image)}
                    />

                ))}
            </div>


            <div className={"flex justify-center m-4"}>

                {lev == 2 && <Image src={l2} alt={"question"} className="md:h-50 md:w-55 h-40 w-25"/>}
            </div>
            <div>
                {lev ==2 && count==1 && <div>1. Which object is closest to the stop signal?</div>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
                {lev == 2 && count==1 && shuffledImages2.map((image, index) => (

                    <Image key={index} src={image} alt={`Image${index + 1}`}
                           className={"aspect-1 md:h-18 md:w-18 h-12 w-12 object-contain cursor-pointer"}
                           onClick={() => handleOnClick(image)}
                    />

                ))}
            </div>
            <div>
                {lev ==2 && count==2 && <div>2. Which object is closest to the Traffic Police? </div>}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
                {lev == 2 && count==2 && shuffledImages3.map((image, index) => (

                    <Image key={index} src={image} alt={`Image${index + 1}`}
                           className={"aspect-1 md:h-18 md:w-18 h-12 w-12 object-contain cursor-pointer"}
                           onClick={() => handleOnClick(image)}
                    />

                ))}
            </div>

            <div className={"flex justify-center m-4"}>
                {lev == 3 && <Image src={l3} alt={"question"} className="md:h-50 md:w-40 h-20 w-20"/>}
            </div>
            <div>
                {lev ==3 && count==1 && <div>1. Which object is closest to the black board? </div>}
            </div>
            <div className="grid grid-cols-2 gap-10 justify-items-center">
                {lev == 3 && count ==1 && shuffledImages4.map((image, index) => (
                    <Image key={index} src={image} alt={`Image${index + 1}`}
                           className={"aspect-1 h-15 w-15 object-contain cursor-pointer"}
                           onClick={() => handleOnClick(image)}
                    />

                ))}
            </div>
            <div>
                {lev ==3 && count==2 && <div> 2. Which object is closest to the window? </div>}
            </div>
            <div className="grid grid-cols-2 gap-10 justify-items-center">
                {lev == 3 && count==2 && shuffledImages5.map((image, index) => (
                    <Image key={index} src={image} alt={`Image${index + 1}`}
                           className={"aspect-1 h-15 w-15 object-contain cursor-pointer"}
                           onClick={() => handleOnClick(image)}
                    />

                ))}
            </div>
            <div>
                {lev ==3 && count==3 && <div>3. Which object is farthest from the black board?  </div>}
            </div>
            <div className="grid grid-cols-2 gap-10 justify-items-center">
                {lev == 3 && count==3 && shuffledImages6.map((image, index) => (
                    <Image key={index} src={image} alt={`Image${index + 1}`}
                           className={"aspect-1 h-15 w-15 object-contain cursor-pointer"}
                           onClick={() => handleOnClick(image)}
                    />

                ))}
            </div>

        </div>
    );
};