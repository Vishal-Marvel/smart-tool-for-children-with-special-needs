import {UsersTable} from "@/components/UsersTable";

export const AdminDashboard = async () => {


    return <div className={" justify-center items-center flex flex-col pt-4"}>
        <h1 className={"font-bold text-2xl m-2 p-2 font-sans"}>User Details</h1>
        <UsersTable/>
    </div>
}