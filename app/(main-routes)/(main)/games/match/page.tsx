import {db} from "@/lib/db";
import {Match} from "@/components/games/match/Match";

const MatchPage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "MATCH THE IMAGE"
        }
    })

    return (
        <Match id={game.id}/>
    )
}
export default MatchPage