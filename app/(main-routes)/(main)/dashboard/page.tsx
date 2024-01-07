import {initProfile} from "@/lib/init-profile";

import {AdminDashboard} from "@/components/AdminDashboard";
import {UserDashboard} from "@/components/UserDashboard";

import {Users} from "@prisma/client";
import {$Enums} from ".prisma/client";
import {UserButton} from "@clerk/nextjs";
import MemberRole = $Enums.MemberRole;


const Dashboard = async () => {
    const profile: Users = await initProfile();

    return <div>
        <div className={"flex justify-between  p-3"}>
            <span className={"font-bold text-2xl capitalize"}>Welcome! {profile.name}</span>
            <div className={"flex flex-row justify-between min-w-1/7"}>
                {profile.role === MemberRole.ADMIN && <UserButton afterSignOutUrl={"/"}/>}
                {/*{profile.role === MemberRole.USER && <UserDetails profile={profile}/>}*/}
            </div>
        </div>
        <div>
            {profile.role === MemberRole.ADMIN && <AdminDashboard/>}
            {profile.role === MemberRole.USER && <UserDashboard/>}
        </div>


    </div>
}
export default Dashboard;