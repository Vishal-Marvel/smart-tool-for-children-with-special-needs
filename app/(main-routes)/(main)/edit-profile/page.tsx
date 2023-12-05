import {EditProfile} from "@/components/EditProfile";
import {Users} from "@prisma/client";
import {currentProfile} from "@/lib/current-profile";
import ToggleButton from "@/components/ToggleButton";

const EditPage = async () => {
    const profile: Users = await currentProfile();
    return (
        <div className={"h-[98vh] "}>
            <div className={" flex justify-end right-0 p-3 m-2"}>
                <ToggleButton/>
            </div>
            <div className={"flex items-center justify-center"}>

                <EditProfile profile={profile}/>
            </div>
        </div>
    )
}
export default EditPage