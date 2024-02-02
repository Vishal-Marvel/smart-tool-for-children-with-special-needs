"use client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {Ear, Speaker, Volume2} from "lucide-react";

interface Props{
    dialog: boolean
    dialogChange:any
    gameName:string
    instructions:string[]

}

export const GameInstruction = ({dialog, dialogChange, gameName, instructions}:Props) =>{
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
    }, [])
    if (!isMounted){
        return null;
    }

  return (
      <Dialog open={dialog}>

          <DialogContent>
              <DialogHeader>
                  <DialogTitle>
                      <div className={"flex justify-between"}>
                      {gameName}
                          <Volume2 className={"h-5 w-5 cursor-pointer hover:scale-150 transition-all duration-200 ease-in"}/>
                      </div>
                  </DialogTitle>
                  <DialogDescription>Lets see How To Play </DialogDescription>

              </DialogHeader>

              <DialogClose className={"hidden"}/>
              <div className={"m-2 p-2"}>

                  <ul className={"list-disc"}>
                      <li className={"mt-2 mb-2"}>
                          This Game Contains 3 levels
                      </li>
                      {instructions.map((instruction, index)=>(
                          <li key={index} className={"mt-2 mb-2"}>
                              {instruction}
                          </li>
                      ))}

                  </ul>

                  <Button onClick={dialogChange} className={"w-full m-2 "}>
                      I have Read the Instructions And I am Ready To Play
                  </Button>

              </div>
          </DialogContent>
      </Dialog>
  )
}