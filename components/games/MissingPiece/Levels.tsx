"use client"
import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

interface Props {
    crt1: StaticImageData,
    wrg1l1: StaticImageData,
    wrg2l1: StaticImageData,
    wrg3l1: StaticImageData,
    crt2: StaticImageData,
    wrg1l2: StaticImageData,
    wrg2l2: StaticImageData,
    wrg3l2: StaticImageData,
    l1: StaticImageData,
    l2: StaticImageData,
    lev: number
    crt3: StaticImageData,
    wrg1l3: StaticImageData,
    wrg2l3: StaticImageData,
    wrg3l3: StaticImageData,
    l3: StaticImageData,
    handleOnClick: (image: StaticImageData) => void
}

export const Levels = ({
                           crt1,
                           wrg1l1,
                           crt2,
                           wrg2l1,
                           wrg3l1,
                           wrg1l2,
                           wrg2l2,
                           wrg3l2,
                           l1,
                           l2,
                           lev,
                           crt3,
                           wrg1l3,
                           wrg2l3,
                           wrg3l3,
                           l3,
                           handleOnClick
                       }: Props) => {
    const [shuffledImages1, setShuffledImages1] = useState<StaticImageData[]>([]);
    const [shuffledImages2, setShuffledImages2] = useState<StaticImageData[]>([]);
    const [shuffledImages3, setShuffledImages3] = useState<StaticImageData[]>([]);

    useEffect(() => {

        const imageArray = [crt1, wrg1l1, wrg2l1, wrg3l1];
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

        const imageArray = [crt2, wrg1l2, wrg2l2, wrg3l2];
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
        const imageArray = [crt3, wrg1l3, wrg2l3, wrg3l3];
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

    return (
        <div>
            {lev == 1 && <>
                <div className={"flex justify-center m-4"}>
                    <Image src={l1} alt={'question'} className="md:h-40 md:w-40 h-30 w-30"/>
                </div>
                <div className="grid grid-cols-2 gap-10 justify-center justify-items-center align-middle">
                    {shuffledImages1.map((image, index) => (
                        <Image key={index} src={image} alt={`Image${index + 1}`}
                               className={"aspect-1 md:h-30 md:w-30 h-15 w-15 cursor-pointer"}
                               onClick={() => handleOnClick(image)}
                        />

                    ))}
                </div>
            </>}

            {lev == 2 &&
                <>
                    <div className={"flex justify-center m-4"}>

                        <Image src={l2} alt={"question"} className="md:h-40 md:w-40"/>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">
                        {shuffledImages2.map((image, index) => (

                            <Image key={index} src={image} alt={`Image${index + 1}`}
                                   className={"aspect-1 h-15 w-15 object-contain cursor-pointer"}
                                   onClick={() => handleOnClick(image)}
                            />

                        ))}
                    </div>
                </>
            }
            {lev == 3 &&
                <>
                    <div className={"flex justify-center m-2"}>
                        <Image src={l3} alt={"question"} className="h-[300px] aspect-auto object-contain"/>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
                        {lev == 3 && shuffledImages3.map((image, index) => (
                            <Image key={index} src={image} alt={`Image${index + 1}`}
                                   className={"aspect-1 h-15 w-15 object-contain cursor-pointer"}
                                   onClick={() => handleOnClick(image)}
                            />

                        ))}
                    </div>
                </>
            }

        </div>
    );
};