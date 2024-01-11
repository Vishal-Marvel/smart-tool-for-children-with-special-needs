"use client"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {Menu} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import CustomSignOutButton from "@/components/Customs/CustomSignOutButton";
import {$Enums} from ".prisma/client";
import MemberRole = $Enums.MemberRole;
import {Users} from "@prisma/client";

interface Props{
    title:string
    user?:Users
}
export const MobileToggle = ({title, user}:Props) => {
  return (
      <Sheet>
        <SheetTrigger>
            <Menu/>
        </SheetTrigger>
          <SheetContent side={"left"}>
              <SheetTitle>
                  {title}
              </SheetTitle>
              <div
                  className={"m-6 w-full items-center flex flex-col h-[300px] justify-evenly"}>

                  <Link href={"/dashboard"}>
                      <Button className={"w-full"}>Dashboard</Button>
                  </Link>
                  {user && user.role === MemberRole.USER &&
                      <>
                          <Link href={"/tests"}>
                              <Button className={"w-full"}>Tests</Button>
                          </Link>
                          <Link href={"/analysis"}>
                              <Button className={"w-full"}>Analysis</Button>
                          </Link>
                      </>
                  }
                  <CustomSignOutButton/>
              </div>
          </SheetContent>
      </Sheet>
  )
}