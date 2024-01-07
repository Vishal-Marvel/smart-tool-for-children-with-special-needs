import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {currentUser} from "@clerk/nextjs";
import {$Enums, Users} from "@prisma/client";

import ProfileEditButton from "@/components/Customs/ProfileEditButton";
import CustomSignOutButton from "@/components/Customs/CustomSignOutButton";
import MemberRole = $Enums.MemberRole;
import {Button} from "@/components/ui/button";


interface Props {
    profile: Users,
    userType?: MemberRole
}

export const UserDetails = async ({profile, userType}: Props) => {
    const user = await currentUser();
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
        <>
            <Dialog>
                <DialogTrigger>
                    {userType === MemberRole.ADMIN &&
                        <Avatar className={"w-9 h-9"}>
                            <AvatarImage src={user.imageUrl}/>
                            <AvatarFallback>{profile.name[0]}</AvatarFallback>
                        </Avatar>
                    }
                    {
                        userType === MemberRole.USER &&
                        <Button className={"w-full"}>Dashboard</Button>
                    }

                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>User Profile</DialogTitle>
                        <DialogClose/>
                    </DialogHeader>
                    <div className={"flex flex-col justify-center justify-items-center"}>

                        <div className="flex flex-col p-4">
                            {userDetails.map((member, index) => (
                                <div className={"grid grid-cols-[30%_2%_45%] gap-5 "} key={index}>
                                    <span className={"text-end"}>{member.key}</span>
                                    <span className={"w-[10px]"}>:</span>
                                    <span className={"text-justify"}>{member.value}</span>
                                </div>
                            ))
                            }
                        </div>
                        <div className={"flex flex-row justify-between"}>
                            <ProfileEditButton/>
                            <CustomSignOutButton/>

                        </div>
                    </div>
                </DialogContent>
            </Dialog>


        </>
    )
}