"use client"
import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

interface Props {
    odd1: StaticImageData,
    even1: StaticImageData,
    even2: StaticImageData,
    odd2: StaticImageData,
    lev: number
    handleOnClick: (image: StaticImageData) => void
}

export const LevOneAndLevTwo = ({odd1, even1, odd2, even2, lev, handleOnClick}: Props) => {
    const [shuffledImages1, setShuffledImages1] = useState<StaticImageData[]>([]);
    const [shuffledImages2, setShuffledImages2] = useState<StaticImageData[]>([]);

    useEffect(() => {
        const imageArray = [odd1, even1, even1, even1];
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
        const imageArray = [odd2, even2, even2, even2];
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

    return (
        <div className={"grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center justify-center"}>
            {lev == 1 && shuffledImages1.map((image, index) => (
                <Image key={index} src={image} alt={`Image${index + 1}`}
                       className={"aspect-1 md:h-40 md:w-40 h-20 w-20 object-contain cursor-pointer "}
                       onClick={() => handleOnClick(image)}
                />
            ))}
            {lev == 2 && shuffledImages2.map((image, index) => (
                <Image key={index} src={image} alt={`Image${index + 1}`}
                       className={"aspect-1 md:h-40 md:w-40 h-20 w-20 object-contain cursor-pointer "}
                       onClick={() => handleOnClick(image)}
                />
            ))}

        </div>
    );
};