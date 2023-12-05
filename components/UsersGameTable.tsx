import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {db} from "@/lib/db";
import {ScrollArea} from "@/components/ui/scroll-area";


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
        <ScrollArea className={"h-[80vh]"}>
            <Table>

                <TableHeader className={"sticky top-0 bg-secondary"}>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Game Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Time Taken</TableHead>
                        <TableHead>Win/Loose</TableHead>
                    </TableRow>
                </TableHeader>


                <TableBody>
            {userGames.map((userGame, index)=> (
                <TableRow key={userGame.id}>
                    <TableCell>{findUser(userGame.userId)}</TableCell>
                    <TableCell>{findGame(userGame.gameId)}</TableCell>
                    <TableCell>{userGame.level}</TableCell>
                    <TableCell>{userGame.timeTaken} s</TableCell>
                    <TableCell>{userGame.accuracy === 1 ? "Won" : "Lost"}</TableCell>
                </TableRow>
                ))}

                </TableBody>

                <TableFooter className={"sticky -bottom-0.5 bg-secondary"}>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell colSpan={2} className="text-right">{userGames.length} Games(s)</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </ScrollArea>
    )
}
