import {db} from "@/lib/db";
import {OddOneOut} from "@/components/games/OddOneOut/OddOneOut";

const OddOneOutPage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "PICK THE ODD ONE OUT"
        }
    })

    return (
        <OddOneOut id={game.id}/>
    )
}
export default OddOneOutPage