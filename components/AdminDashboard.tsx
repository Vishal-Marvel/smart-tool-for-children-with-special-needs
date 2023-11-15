import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {UsersTable} from "@/components/UsersTable";
import {UsersGameTable} from "@/components/UsersGameTable";

export const AdminDashboard = async () => {


    return <div className={" justify-center items-center flex pt-4"}>
        <Tabs defaultValue="users" className="w-4/5">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Users Data</TabsTrigger>
                <TabsTrigger value="games">Users Game Data</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
                <UsersTable/>
            </TabsContent>
            <TabsContent value="games">
                <UsersGameTable/>
            </TabsContent>
        </Tabs>
    </div>
}