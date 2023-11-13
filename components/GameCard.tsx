import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import Image, {StaticImageData} from "next/image";

interface GameCardProps{
    image: StaticImageData,
    text: string,
    name: string
}

export const GameCard= ({image, text, name}: GameCardProps)=>{
    return (
        <Card className={"p-3 m-3 w-[350px]"}>
            <CardTitle className={"p-2 text-center"}>
                {name}
            </CardTitle>
            <CardDescription className={"flex text-center h-[80px] items-center justify-center"}>
                {text}
            </CardDescription>
            <CardContent className={" flex items-center justify-center p-3"}>
                <Image src={image} alt={name}/>
            </CardContent>
        </Card>
    )
}