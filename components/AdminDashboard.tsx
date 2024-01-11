import {UsersTable} from "@/components/UsersTable";
import {SideBar} from "@/components/SideBar";
import {currentProfile} from "@/lib/current-profile";

export const AdminDashboard = async () => {
    const user = await currentProfile();

    return (
        <div className={"p-2 flex"}>
            <SideBar user={user}/>
            <div className={" justify-center items-center flex flex-col pt-4"}>
                <h1 className={"font-bold text-2xl m-2 p-2 font-sans"}>User Details</h1>
                <UsersTable/>
            </div>
        </div>
    )
}