import "./style.css"
import {MemoryGame} from "@/components/games/MemoryGame";
import {db} from "@/lib/db";

const MemoryPage = async ()=> {
  const game = await db.game.findUnique({
    where:{
      name: "PAIR THE HIDDEN OBJECT"
    }
  })

  return(
      <MemoryGame id={game.id}/>
    )
}
export default MemoryPage