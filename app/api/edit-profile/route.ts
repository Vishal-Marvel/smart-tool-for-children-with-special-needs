import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {currentProfile} from "@/lib/current-profile";

export async function PUT(
    req: Request
) {
    try {
        const user = await currentProfile();
        const {name, age, gender, weight, height, phone, medicalHistory} = await req.json();

        const editedUser = await db.users.update({
            where: {
                email: user.email
            },
            data: {
                name,
                age,
                gender,
                height,
                weight,
                medical_history: medicalHistory,
                phone_no: phone,
            }
        });
        return NextResponse.json(editedUser);


    } catch (error) {
        console.log("EDIT-PROFILE", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}