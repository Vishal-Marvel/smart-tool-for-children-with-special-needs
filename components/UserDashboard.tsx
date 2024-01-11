
import {currentProfile} from "@/lib/current-profile";
import ProfileEditButton from "@/components/Customs/ProfileEditButton";
import {SideBar} from "@/components/SideBar";
import {MobileToggle} from "@/components/MobileToggle";

export const UserDashboard = async () => {
    const profile = await currentProfile();
    const userDetails = [
        {key: "Name", value: profile.name},
        {key: "Email", value: profile.email},
        {key: "Gender", value: profile.gender},
        {key: "Age", value: profile.age},
        {key: "Weight", value: profile.weight},
        {key: "Height", value: profile.height},
        {key: "Phone Number", value: profile.phone_no},
        {key: "Medical History", value: profile.medical_history}
    ]
    return (

        <div className={"p-2 flex "}>
            <SideBar user={profile}/>

            <div className={"m-4 p-2 flex w-full md:justify-center"}>
                <div className={"md:w-1/2 flex flex-col justify-center justify-items-center"}>

                    <div className="flex flex-col p-4">
                        {userDetails.map((member, index) => (
                            <div className={"grid grid-cols-[40%_2%_45%] gap-5 p-2 text-[20px]"} key={index}>
                                <span className={"text-end"}>{member.key}</span>
                                <span className={"w-[10px]"}>:</span>
                                <span className={"text-justify"}>{member.value}</span>
                            </div>
                        ))
                        }
                    </div>
                    <div className={"flex flex-row justify-between"}>
                        <ProfileEditButton/>
                    </div>
                </div>
            </div>
        </div>
    );
}