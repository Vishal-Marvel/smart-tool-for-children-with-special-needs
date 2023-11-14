import {db} from "@/lib/db";
import {Hangman} from "@/components/HangmanGame";

const HangmanPage = async ()=> {
    const game = await db.game.findUnique({
        where:{
            name:"Hangman"
        }
    })

    return(
        <div className={"w-screen "}>
        <Hangman id={game.id}/>
        </div>
    )
}
export default HangmanPage