import {GuessTheNumber} from "@/components/GuessTheNumber";
import {db} from "@/lib/db";


export default async function Guess() {
    const game = await db.game.findUnique({
        where:{
            name:"Guess the Number"
        }
    })


    return (
          <GuessTheNumber id={game.id}/>
    );
}