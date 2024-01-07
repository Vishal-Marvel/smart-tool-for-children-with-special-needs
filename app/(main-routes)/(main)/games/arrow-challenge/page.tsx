import {db} from "@/lib/db";
import {Distance} from "@/components/games/Distance/Distance";
import ImageSeries from "@/components/games/ArrowChallenge/ImageSeries";
import {ArrowChallenge} from "@/components/games/ArrowChallenge/ArrowChallenge";

const ArrowChallengePage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "THE ARROW CHALLENGE"
        }
    })

    return (
        <ArrowChallenge id={game.id}/>
    )
}
export default ArrowChallengePage