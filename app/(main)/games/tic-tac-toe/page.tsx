import "./style.css"
import {db} from "@/lib/db";
import {TicTacToeGame} from "@/components/TicTacToeGame";

const TicTacToePage = async ()=> {
    const game = await db.game.findUnique({
        where:{
            name:"tic-tac-toe"
        }
    })

    return(
        <TicTacToeGame id={game.id}/>
    )
}
export default TicTacToePage