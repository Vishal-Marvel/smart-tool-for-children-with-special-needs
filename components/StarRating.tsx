"use client"
import star from "@/public/star.png"
import Image from "next/image";
const StarRating = ({ num }) => {
    const stars = Array.from({ length: num });

    return (
        <div className="flex items-center justify-center">
            {stars.map((filled, index) => (
               <Image src={star} alt={"Star"} key={index} className={"h-24 w-24"}/>
            ))}
        </div>
    );
};

export default StarRating;
