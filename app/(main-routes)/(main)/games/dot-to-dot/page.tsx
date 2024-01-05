import {db} from "@/lib/db";
import {DotToDot} from "@/components/games/DotToDot/DotToDot";

const DotToDotPage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "DOT TO DOT"
        }
    })

    return (
        <DotToDot id={game.id}/>
        // <DotToDot id={game.id}/>
    )
}
export default DotToDotPage