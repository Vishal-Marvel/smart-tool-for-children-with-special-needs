import {NextResponse} from "next/server";

import {currentUser} from "@clerk/nextjs";
import {retry} from "next/dist/compiled/@next/font/dist/google/retry";
import {db} from "@/lib/db";

export async function POST(
    req:Request
){
    try{
        const user = await currentUser();
        const {name, age, gender, weight, height, phone, medicalHistory} = await req.json();
        const email = user.emailAddresses[0].emailAddress;
        const existingProfile = await db.users.findUnique({
            where: {
                email: user.emailAddresses[0].emailAddress
            }
        });
        if (existingProfile){
            return new NextResponse("User Already Exists", {status: 400})
        }
        const new_user = await db.users.create({
            data: {
                name,
                age,
                gender,
                height,
                weight,
                medical_history:medicalHistory,
                phone_no: phone,
                email,
            }
        });
        return NextResponse.json(new_user);


    }catch (error){
        console.log("SIGNUP", error)
        return new NextResponse("Internal Error", {status: 500});
    }
}