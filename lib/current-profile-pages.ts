import { NextApiRequest } from "next";
import { getAuth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfilePages = async (req: NextApiRequest) => {
  // const { email } = getAuth(req);
  console.log(getAuth(req))
  // if (!userId) {
  //   return null;
  // }

  // const profile = await db.users.findUnique({
  //   where: {
  //     userId
  //   }
  // });

  return null;
}