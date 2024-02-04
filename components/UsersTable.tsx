import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {db} from "@/lib/db";
import {$Enums} from ".prisma/client";
import {ScrollArea} from "@/components/ui/scroll-area";
import MemberRole = $Enums.MemberRole;
import Link from "next/link";
import {Button} from "@/components/ui/button";


export const UsersTable = async () => {
    const users = await db.users.findMany({
        where: {
            role: MemberRole.USER
        }
    });
    return (
        <ScrollArea className={"h-[80vh] "}>

            <Table className={"shadow-xl   rounded-2xl bg-blue-300 bg-blend-color bg-opacity-30"}>
                <TableHeader className={"sticky top-0 "}>
                    <TableRow className={"text-indigo-950 bg-secondary bg-opacity-30"}>
                        <TableHead className={"lg:w-1/7"}>User Name</TableHead>
                        <TableHead className={"hidden lg:table-cell"}>Age</TableHead>
                        <TableHead className={"hidden lg:table-cell"}>Weight</TableHead>
                        <TableHead className={"hidden lg:table-cell"}>Height</TableHead>
                        <TableHead className={"hidden lg:table-cell"}>Email</TableHead>
                        <TableHead className={"hidden lg:table-cell"}>Phone</TableHead>
                        <TableHead className={"w-2/5 hidden lg:table-cell"}>Medical History</TableHead>
                        <TableHead className={"lg:w-1/6"}>View Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell className={"hidden lg:table-cell"}>{user.age}</TableCell>
                            <TableCell className={"hidden lg:table-cell"}>{user.weight}</TableCell>
                            <TableCell className={"hidden lg:table-cell"}>{user.height}</TableCell>
                            <TableCell className={"hidden lg:table-cell"}>{user.email}</TableCell>
                            <TableCell className={"hidden lg:table-cell"}>{user.phone_no}</TableCell>
                            <TableCell className={"text-right hidden lg:table-cell"}>{user.medical_history}</TableCell>
                            <TableCell><Button variant={"ghost"}><Link href={"analysis/" + user.id}>View
                                Details</Link></Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className={"sticky bottom-0 "}>
                    <TableRow className={"bg-secondary bg-opacity-30"}>
                        <TableCell colSpan={7}>Total</TableCell>
                        <TableCell className="text-right">{users.length} User(s)</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </ScrollArea>
    )
}
