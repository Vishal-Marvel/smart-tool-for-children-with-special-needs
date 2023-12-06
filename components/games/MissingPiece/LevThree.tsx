import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

interface Props {
    crt3: StaticImageData,
    wrg1l3: StaticImageData,
    wrg2l3: StaticImageData,
    wrg3l3: StaticImageData,
    wrg4l3: StaticImageData,
    l3:StaticImageData,
    handleClick: (image: StaticImageData) => void
}

export const LevThree = ({crt3, wrg1l3, wrg2l3, wrg3l3, wrg4l3,l3, handleClick}: Props) => {
    const [shuffledImages, setShuffledImages] = useState<StaticImageData[]>([]);

    useEffect(() => {
        const imageArray = [crt3, wrg1l3, wrg2l3, wrg3l3, wrg4l3];
        const validImages = imageArray.filter(image => image);
        const shuffleArray = (array: StaticImageData[]) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };
        const shuffledArray = shuffleArray(validImages);

        setShuffledImages(shuffledArray);
    }, []);

    return (
        <div className={" justify-items-center justify-center"}>
            <div className="grid grid-cols-2 gap-10">
            {shuffledImages.map((image, index) => (      
                <Image key={index} src={image} alt={`Image${index + 1}`}
                       className={"aspect-1 h-15 w-15 object-contain cursor-pointer"}
                       onClick={() => handleClick(image)}
                />
                
            ))}
            </div>
            <div>
             <Image src={l3} alt={"question"} className="md:h-40 md:w-40 h-20 w-20"/>
            </div>
        </div>
    );
};