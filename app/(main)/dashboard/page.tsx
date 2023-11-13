import {UserButton} from "@clerk/nextjs";
import {initProfile} from "@/lib/init-profile";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;
import {AdminDashboard} from "@/components/AdminDashboard";
import {UserDashboard} from "@/components/UserDashboard";

const Dashboard = async () => {
    const profile = await initProfile()


    return <div className={"p-3 m-3"}>
        <div className={"flex justify-between"}>
            <span className={"font-bold text-2xl capitalize"}> Dashboard</span>
            <UserButton afterSignOutUrl={"/"}/>
        </div>
        <div>
            {profile.role === MemberRole.ADMIN && <AdminDashboard id={profile.id}/>}
            {profile.role === MemberRole.USER && <UserDashboard id={profile.id}/>}
        </div>


    </div>
}
export default Dashboard;