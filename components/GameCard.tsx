import {Card, CardContent, CardDescription, CardFooter, CardTitle} from "@/components/ui/card";
import Image, {StaticImageData} from "next/image";
import {Button, buttonVariants} from "@/components/ui/button";
import Link from "next/link";

interface GameCardProps {
    image: StaticImageData,
    text: string,
    name: string,
    med: string,
    link: string
}

export const GameCard = ({image, text, name, med, link}: GameCardProps) => {
    return (
        <Card className={"p-3 m-3 w-[350px] bg-opacity-40 bg-white border-0 shadow-2xl"}>
            <CardTitle className={"p-2 text-center"}>
                {name}
            </CardTitle>
            <CardDescription className={"flex flex-col text-center h-[120px] items-center justify-center"}>
                <strong className={"capitalize"}>{med}</strong><br/>
                {text}
            </CardDescription>
            <CardContent className={"flex-1 h-[300px]"}>

                <div className={"flex-1 flex-col justify-center items-center "}>
                    <Image src={image} alt={name} className={" aspect-square object-contain"}/>
                </div>

            </CardContent>
            <CardFooter className={"flex justify-center"}>
                <Link href={link} className={buttonVariants({variant: "default"})}>Start Game</Link>
            </CardFooter>
        </Card>
    )
}