import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import Image, {StaticImageData} from "next/image";

interface GameCardProps{
    image: StaticImageData,
    text: string,
    name: string,
    med: string
}

export const GameCard = ({image, text, name, med}: GameCardProps) => {
    return (
        <Card className={"p-3 m-3 w-[350px] h-[500px]"}>
            <CardTitle className={"p-2 text-center"}>
                {name}
            </CardTitle>
            <CardDescription className={"flex flex-col text-center h-[120px] items-center justify-center"}>
                <strong className={"capitalize"}>{med}</strong><br/>
                {text}
            </CardDescription>
            <CardContent className={"flex items-center justify-center p-3 justify-items-center"}>
                <div className={"flex flex-col justify-center items-center"}>
                    <Image src={image} alt={name}/>
                </div>
            </CardContent>
        </Card>
    )
}