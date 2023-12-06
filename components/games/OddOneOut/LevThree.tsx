import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

interface Props {
    odd: StaticImageData,
    even: StaticImageData,
    handleClick: (image: StaticImageData) => void
}

export const LevThree = ({odd, even, handleClick}: Props) => {
    const [shuffledImages, setShuffledImages] = useState<StaticImageData[]>([]);

    useEffect(() => {
        const imageArray = [odd, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even, even];
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
        <div className={"grid grid-cols-3 md:grid-cols-6 justify-items-center justify-center"}>
            {shuffledImages.map((image, index) => (
                <Image key={index} src={image} alt={`Image${index + 1}`}
                       className={"aspect-1 h-20 w-20 object-contain cursor-pointer"}
                       onClick={() => handleClick(image)}
                />
            ))}


        </div>
    );
};