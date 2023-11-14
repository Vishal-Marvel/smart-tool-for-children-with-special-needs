import {RPSGame} from "@/components/RPS/Game";
import {db} from "@/lib/db";

const RockPaperScissorGamePage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "Rock Paper Scissor"
        }
    })

    return (
        <RPSGame id={game.id}/>
    )
}
export default RockPaperScissorGamePage