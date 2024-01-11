
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

        <div className={"md:p-2 m-2  md:flex-row flex flex-col"}>
            <SideBar user={profile}/>

            <div className={"md:m-4 p-2 flex w-full md:justify-center"}>
                <div className={"md:w-1/2 flex flex-col justify-center justify-items-center"}>

                    <div className="flex flex-col md:p-4">
                        {userDetails.map((member, index) => (
                            <div className={"grid md:grid-cols-[40%_2%_45%] grid-cols-[15%_1%_15%] gap-5 p-2 md:text-xl text-sm"} key={index}>
                                <span className={"md:text-end text-left pt-2 md:pb-2"}>{member.key}</span>
                                <span className={"md:w-[10px] pt-2 md:pb-2"}>:</span>
                                <span className={"text-justify pt-2 md:pb-2"}>{member.value}</span>
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