import {db} from "@/lib/db";
import {redirect} from "next/navigation";

export const getProfile = async (id) =>{

    const profile = await db.users.findUnique({
        where: {
            id
        }
    });


    if (profile) {
        return profile;
    }else{
        // console.log(user)
        return redirect("/signup") ;
    }

}