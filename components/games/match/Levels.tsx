"use client"
import Image, {StaticImageData} from "next/image";
import {useEffect, useState} from "react";

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
    q5l3: StaticImageData,
    a1l3: StaticImageData,
    a2l3: StaticImageData,
    a3l3: StaticImageData,
    a4l3: StaticImageData,
    a5l3: StaticImageData,
  
    handleOnDraw: (drawnAnswer:StaticImageData,questionimage: StaticImageData) => void
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
                           q5l3,
                           a1l3,
                           a2l3,
                           a3l3,
                           a4l3,
                           a5l3,
                           handleOnDraw,
                       }: Props) => {
    const [shuffledImages1, setShuffledImages1] = useState<StaticImageData[]>([]);
    const [shuffledImages2, setShuffledImages2] = useState<StaticImageData[]>([]);
    const [shuffledImages3, setShuffledImages3] = useState<StaticImageData[]>([]);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, image: StaticImageData) => {
        event.dataTransfer.setData("image", JSON.stringify(image)); // Set the dragged image data
      };
    
      const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
      };
    
      const handleDrop = (event: React.DragEvent<HTMLDivElement>, questionImage: StaticImageData) => {
        event.preventDefault();
        const draggedImageData = JSON.parse(event.dataTransfer.getData("image")); // Get the dragged image data
    
        // Call the handleDraw function with the dragged image and the question image
        handleOnDraw(draggedImageData, questionImage);
    
        // Update selected answers state or perform any necessary actions
      };

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
       
        const imageArray = [a1l2, a2l2,a3l2];
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
        const imageArray = [a1l3, a2l3, a3l3, a4l3, a5l3];
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
          
            <div >
                {lev==1 
                    && 
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-10 justify-items-center">
                            <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q1l1)}
                            >
                            <Image src={q1l1} alt={'question1'} />
                            </div>
                            <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q2l1)}
                            >
                            <Image src={q2l1} alt={'question2'}/>
                            </div>

                            {lev == 1 && shuffledImages1.map((image, index) => (
                                
                                 <div
                                 key={index}
                                 className={"aspect-1 md:h-30 md:w-30 h-15 w-15 cursor-pointer"}
                                 onDragStart={(event) => handleDragStart(event, image)}
                                 draggable
                               >
                                 <Image src={image} alt={`Image${index + 1}`} />
                               </div>
                        

                ))}
                    </div>
                   
                }
                
            </div>


       

            <div>
                {lev==2
                    && 
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
                          <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q1l2)}
                            >
                        <Image src={q1l2} alt={'question1'} />
                        </div>
                        <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q2l2)}
                            >
                        <Image src={q2l2} alt={'question2'}/>
                        </div>
                        <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q3l2)}
                            >
                        <Image src={q3l2} alt={'question3'}/>
                        </div>
                        {lev == 2 && shuffledImages2.map((image, index) => (

                                <div
                                    key={index}
                                    className={"aspect-1 md:h-30 md:w-30 h-15 w-15 cursor-pointer"}
                                    onDragStart={(event) => handleDragStart(event, image)}
                                    draggable
                                >
                                <Image src={image} alt={`Image${index + 1}`} />
                                </div>

                        ))}
                    </div>
                   
                }
               
            </div>
         
            <div>
            {lev==3 
                    && 
                    <div className="grid grid-cols-2  md:grid-cols-5 gap-10 justify-items-center">
                          <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q1l3)}
                            >
                            <Image src={q1l3} alt={'question1'} />
                            </div>
                            <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q2l3)}
                            >
                            <Image src={q2l3} alt={'question2'}/>
                            </div>
                            <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q3l3)}
                            >
                            <Image src={q3l3} alt={'question3'} />
                            </div>
                            <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q4l3)}
                            >
                            <Image src={q4l3} alt={'question4'}/>
                            </div>
                            <div
                                onDragOver={(event) => handleDragOver(event)}
                                onDrop={(event) => handleDrop(event, q5l3)}
                            >
                            <Image src={q5l3} alt={'question5'} />
                            </div>
                            {lev == 3 && shuffledImages3.map((image, index) => (
                                <div
                                key={index}
                                className={"aspect-1 md:h-30 md:w-30 h-15 w-15 cursor-pointer"}
                                onDragStart={(event) => handleDragStart(event, image)}
                                draggable
                              >
                                <Image src={image} alt={`Image${index + 1}`} />
                              </div>

                ))}
                    </div>
                    
                 
                }   
            </div>

        </div>
    );
};