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

interface Props{
    dialog: boolean
    dialogChange:any
    gameName:string
    level1:string
    level2:string
    level3:string
    instructions:string[]

}

export const GameInstruction = ({dialog, dialogChange, gameName, level1, level2, level3, instructions}:Props) =>{
    // const [instructionSet, setInstructionSet] = useState([]);
    // useEffect(()=>{
    //     if (instructions){
    //         setInstructionSet(instructions);
    //     }
    // }, [])
  return (
      <div>
      <Dialog open={dialog}>

          <DialogContent>
              {/*<DialogHeader>*/}
                  <DialogTitle className={"uppercase"}>{gameName}</DialogTitle>
                  <DialogDescription>Lets see How To Play </DialogDescription>

              {/*</DialogHeader>*/}

              <DialogClose className={"hidden"}/>

                  <ul className={"list-disc"}>
                      <li className={"mt-2 mb-2"}>
                          This Game Contains 3 levels with the following Timings
                          <ul className={"ml-10"}>
                              <li>Level 1: <strong>{level1}</strong></li>
                              <li>Level 2: <strong>{level2}</strong></li>
                              <li>Level 1: <strong>{level3}</strong></li>
                          </ul>
                      </li>
                      {instructions.map((instruction, index)=>(
                          <li key={index} className={"mt-2 mb-2"}>
                              {instruction}
                          </li>
                      ))}

                  </ul>
                  <Button onClick={dialogChange}>
                      I have Read the Instructions And I am Ready To Play
                  </Button>
          </DialogContent>
      </Dialog>
      </div>
  )
}