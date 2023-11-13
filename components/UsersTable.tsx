import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {db} from "@/lib/db";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;


export const UsersTable = async ()=> {
    const users = await db.users.findMany({
        where:{
            role:MemberRole.USER
        }
    });
    return (
        <Table>
            <TableHeader>
                <TableRow  className={"text-indigo-950"}>
                    <TableHead className={"w-1/7"}>User Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Height</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className={"w-2/5 text-center"}>Medical History</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user, index)=> (
                    <TableRow key={user.id}>
                        <TableCell >{user.name}</TableCell>
                        <TableCell >{user.age}</TableCell>
                        <TableCell >{user.weight}</TableCell>
                        <TableCell >{user.height}</TableCell>
                        <TableCell >{user.email}</TableCell>
                        <TableCell >{user.phone_no}</TableCell>
                        <TableCell className={"text-center"}>{user.medical_history}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={6}>Total</TableCell>
                    <TableCell className="text-right">{users.length} User(s)</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
