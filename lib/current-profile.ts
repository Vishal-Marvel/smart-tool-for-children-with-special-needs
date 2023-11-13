import {currentUser} from "@clerk/nextjs";

import {db} from "@/lib/db";

export const currentProfile = async () => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    return db.users.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress
        }
    });
}