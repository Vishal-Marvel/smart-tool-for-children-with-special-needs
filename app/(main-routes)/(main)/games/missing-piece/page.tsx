import {db} from "@/lib/db";
import {MissingPiece} from "@/components/games/MissingPiece/MissingPiece";

const MissingPiecePage = async () => {
    const game = await db.game.findUnique({
        where: {
            name: "SPOT THE MISSING PIECE"
        }
    })

    return (
        <MissingPiece id={game.id}/>
    )
}
export default MissingPiecePage