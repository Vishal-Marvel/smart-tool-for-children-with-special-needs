import {currentProfile} from "@/lib/current-profile";
import ProfileEditButton from "@/components/Customs/ProfileEditButton";
import {SideBar} from "@/components/SideBar";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

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

        <div className={"md:p-2 m-2 h-full  md:flex-row flex flex-col"}>
            <SideBar user={profile}/>

            <div className={"md:m-4 p-2 flex w-full md:justify-center "}>
                <div
                    className={"md:w-2/3  flex flex-col justify-center justify-items-center border-4 border-gray-200 rounded-2xl"}>

                    {/*<div className="flex flex-col md:p-4">*/}
                    {/*    {userDetails.map((member, index) => (*/}
                    {/*        <div*/}
                    {/*            className={"grid md:grid-cols-[40%_2%_45%] grid-cols-[15%_1%_15%] gap-5 p-2 md:text-xl text-sm"}*/}
                    {/*            key={index}>*/}
                    {/*            <span className={"md:text-end text-left pt-2 md:pb-2"}>{member.key}</span>*/}
                    {/*            <span className={"md:w-[10px] pt-2 md:pb-2"}>:</span>*/}
                    {/*            <span className={"text-justify pt-2 md:pb-2"}>{member.value}</span>*/}
                    {/*        </div>*/}
                    {/*    ))*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <div className="grid w-full items-center gap-3 grid-cols-3 ">
                        {userDetails.splice(0,7).map((detail, index) => (
                            <div className={"flex flex-col m-4 "}>
                                <span className={"font-semibold"}>{detail.key}:</span>
                                <span className={"border-2 p-2 rounded-2xl w-full"}>
                                {detail.value}
                                </span>
                            </div>
                        ))}

                    </div>

                    <div className={"m-4"}>
                        <Label className={"font-2xl"}>Medical History</Label>
                        <Textarea
                            contentEditable={false}
                            placeholder="Your Medical History"
                            value={profile.medical_history}
                        />

                    </div>

                    <div className={"m-4 flex flex-row justify-between"}>
                        <ProfileEditButton/>
                    </div>
                </div>
            </div>
        </div>
    );
}