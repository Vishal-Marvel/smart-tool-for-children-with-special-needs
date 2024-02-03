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
import {StartGameButton} from "@/components/StartGameButton";

interface Props{
    title:string
    user?:Users
}
export const MobileToggle = ({title, user}:Props) => {
  return (
      <Sheet>
        <SheetTrigger className={"sticky top-2 left-2"}>
            <Menu/>
        </SheetTrigger>
          <SheetContent side={"left"} >
              <SheetTitle>
                  {title}
              </SheetTitle>
              <div
                  className={"w-full items-center flex flex-col h-[400px] justify-evenly"}>

                  <Link href={"/dashboard"}>
                      <Button  className={"w-[150px]"}>Dashboard</Button>
                  </Link>
                  {user && user.role === MemberRole.USER &&
                      <>
                          <StartGameButton/>

                          <Link href={"/tests"}>
                              <Button className={"w-[150px]"}>Tests</Button>
                          </Link>
                          <Link href={"/analysis"}>
                              <Button  className={"w-[150px]"}>Analysis</Button>
                          </Link>
                      </>
                  }
                  <CustomSignOutButton />
              </div>
          </SheetContent>
      </Sheet>
  )
}