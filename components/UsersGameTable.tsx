import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {db} from "@/lib/db";


export const UsersGameTable = async ()=> {
    let userGames = await db.user_Game.findMany();
    userGames.reverse();
    const games = await db.game.findMany();
    const users = await db.users.findMany();
    const findGame = (id) => {
        return games.find(game => game.id === id)?.name
    }
    const findUser = (id) => {
        return users.find(user => user.id === id)?.name
    }
    return (
        <Table>
            <TableHeader>
                <TableRow >
                    <TableHead className={"text-center text-indigo-950"}>User Name</TableHead>
                    <TableHead className={"text-center text-indigo-950"}>Game Name</TableHead>
                    <TableHead className={"text-center text-indigo-950"}>Points</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userGames.map((userGame, index)=> (
                    <TableRow key={userGame.id}>
                        <TableCell className={"text-center"}>{findUser(userGame.userId)}</TableCell>
                        <TableCell className={"text-center"}>{findGame(userGame.gameId)}</TableCell>
                        <TableCell className={"text-center"}>{userGame.points}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{userGames.length} Games(s)</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
