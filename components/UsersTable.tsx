import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {db} from "@/lib/db";
import {$Enums} from ".prisma/client";
import {ScrollArea} from "@/components/ui/scroll-area";
import MemberRole = $Enums.MemberRole;
import Link from "next/link";
import {Button} from "@/components/ui/button";


export const UsersTable = async ()=> {
    const users = await db.users.findMany({
        where:{
            role:MemberRole.USER
        }
    });
    return (
        <ScrollArea className={"h-[80vh]"}>

            <Table>
                <TableHeader className={"sticky top-0 bg-secondary"}>
                    <TableRow className={"text-indigo-950"}>
                        <TableHead className={"w-1/7"}>User Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Height</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className={"w-2/5"}>Medical History</TableHead>
                        <TableHead className={"w-1/6"}>View Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user, index)=> (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.age}</TableCell>
                            <TableCell>{user.weight}</TableCell>
                            <TableCell>{user.height}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone_no}</TableCell>
                            <TableCell className={"text-right"}>{user.medical_history}</TableCell>
                            <TableCell><Button variant={"link"} ><Link href={"user-details/"+user.id}>View Details</Link> </Button></TableCell>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className={"sticky bottom-0 bg-secondary"}>
                    <TableRow>
                        <TableCell colSpan={7}>Total</TableCell>
                        <TableCell className="text-right">{users.length} User(s)</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </ScrollArea>
    )
}
