"use client"
import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

interface Props {
    crt1: StaticImageData,
    wrg1l1: StaticImageData,
    wrg2l1: StaticImageData,
    wrg3l1:StaticImageData,
    crt2: StaticImageData,
    wrg1l2: StaticImageData,
    wrg2l2: StaticImageData,
    wrg3l2:StaticImageData,
    l1:StaticImageData,
    l2:StaticImageData,
    lev: number
    handleOnClick: (image: StaticImageData) => void
}

export const LevOneAndLevTwo = ({crt1, wrg1l1, crt2, wrg2l1,wrg3l1,wrg1l2,wrg2l2, wrg3l2,l1,l2, lev, handleOnClick}: Props) => {
    const [shuffledImages1, setShuffledImages1] = useState<StaticImageData[]>([]);
    const [shuffledImages2, setShuffledImages2] = useState<StaticImageData[]>([]);

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

    return (
        <div className={" justify-items-center justify-center"}>
        
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {lev == 1 && shuffledImages1.map((image, index) => (   
                <Image key={index} src={image} alt={`Image${index + 1}`}
                       className={"aspect-1 md:h-30 md:w-30 h-15 w-15 object-contain cursor-pointer"}
                       onClick={() => handleOnClick(image)}
                />
          
            ))}
            </div>
            
           <div>
            {lev==1 && <Image src={l1} alt={'question'} className="md:h-40 md:w-40 h-20 w-20"/>}
           </div>
            
           {lev==2 && <Image src={l2} alt={"question"} className="md:h-40 md:w-45 h-20 w-25"/>}
           <div className="grid grid-cols-4 gap-5 ml-2">
            {lev == 2 && shuffledImages2.map((image, index) => (
               
                <Image key={index} src={image} alt={`Image${index + 1}`}
                       className={"aspect-1 md:h-12 md:w-12 h-6 w-6 object-contain cursor-pointer"}
                       onClick={() => handleOnClick(image)}
                />
                
            ))}
            </div>
            
        </div>
    );
};