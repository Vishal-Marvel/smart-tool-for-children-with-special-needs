import { currentProfile } from "@/lib/current-profile";
import ProfileEditButton from "@/components/Customs/ProfileEditButton";
import { SideBar } from "@/components/SideBar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const UserDashboard = async () => {
  const profile = await currentProfile();
  const userDetails = [
    { key: "Name", value: profile.name },
    { key: "Email", value: profile.email },
    { key: "Gender", value: profile.gender },
    { key: "Age", value: profile.age },
    { key: "Weight", value: profile.weight },
    { key: "Height", value: profile.height },
    { key: "Phone Number", value: profile.phone_no },
    { key: "Medical History", value: profile.medical_history },
  ];
  return (
    <div className={"md:p-2 m-2 h-full  md:flex-row flex flex-col"}>
      <SideBar user={profile} />

      <div className={"md:m-4 p-2 flex w-full md:justify-center "}>
        <div
          className={
            "md:w-4/5 bg-opacity-50 bg-white p-6 flex flex-col justify-center justify-items-center border-4 border-gray-500 rounded-2xl"
          }
        >
          <div className="grid w-full items-center gap-3 grid-cols-3 p-3">
            {userDetails.splice(0, 7).map((detail, index) => (
              <div className={"flex flex-col m-4 "}>
                <span className={"font-semibold"}>{detail.key}:</span>
                <span
                  className={
                    "border-2 border-emerald-700 p-2 rounded-xl w-[250px]"
                  }
                >
                  {detail.value}
                </span>
              </div>
            ))}
          </div>

          <div className={"m-4"}>
            <Label className={"font-2xl"}>Medical History</Label>
            <Textarea
              className={"bg-transparent border-emerald-700 border-2"}
              contentEditable={false}
              value={profile.medical_history}
            />
          </div>

          <div className={"m-4 flex flex-row justify-between"}>
            <ProfileEditButton />
          </div>
        </div>
      </div>
    </div>
  );
};
