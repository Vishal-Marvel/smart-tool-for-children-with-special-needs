import {db} from "@/lib/db";
import {Match} from "@/components/games/match/match";

const MissingPiecePage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "MATCH THE IMAGE"
        }
    })

    return (
        <Match id={game.id}/>
    )
}
export default MissingPiecePage