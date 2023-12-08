import {db} from "@/lib/db";
import {Distance} from "@/components/games/Distance/Distance";

const DistancePage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "DISTANCE DASH"
        }
    })

    return (
        <Distance id={game.id}/>
    )
}
export default DistancePage