import {UserButton} from "@clerk/nextjs";
import {initProfile} from "@/lib/init-profile";
import {$Enums} from ".prisma/client";
import {AdminDashboard} from "@/components/AdminDashboard";
import {UserDashboard} from "@/components/UserDashboard";
import ToggleButton from "@/components/ToggleButton";
import {UserDetails} from "@/components/UserDetails";
import {Users} from "@prisma/client";
import MemberRole = $Enums.MemberRole;

const Dashboard = async () => {
    const profile: Users = await initProfile()


    return <div className={"p-3 m-3"}>
        <div className={"flex justify-between"}>
            <span className={"font-bold text-2xl capitalize"}>Dashboard</span>
            <div className={"flex flex-row justify-between min-w-1/7"}>
                <ToggleButton/>
                {profile.role === MemberRole.ADMIN && <UserButton afterSignOutUrl={"/"}/>}
                {profile.role === MemberRole.USER && <UserDetails profile={profile}/>}
            </div>
        </div>
        <div>
            {profile.role === MemberRole.ADMIN && <AdminDashboard/>}
            {profile.role === MemberRole.USER && <UserDashboard/>}
        </div>


    </div>
}
export default Dashboard;