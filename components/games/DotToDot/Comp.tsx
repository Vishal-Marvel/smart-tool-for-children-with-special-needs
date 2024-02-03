import React, {useEffect, useState} from "react";
import Image, {StaticImageData} from "next/image";
import {Button} from "@/components/ui/button";

interface stateInterface {
    boardSize: number
    winMessage: string,
    lineCoordinates: any
}
interface Props{
    img:StaticImageData
    handleDone:(any)=>void
    timeUp: boolean

}

export const Comp = ({img, handleDone, timeUp}:Props) => {
    const [state, setState] = useState<stateInterface>({
        boardSize: 2,
        winMessage: "",
        lineCoordinates: {}
    });
    useEffect(() => {
        if (timeUp === true) {
            handleDone(state.lineCoordinates);
        }
    }, [timeUp])

    const initialBoard = (size) => {
        let state = {
            boardSize: size,
            winMessage: "",
            lineCoordinates: {}
        }
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < state.boardSize + 1; j++) {
                for (let k = 0; k < state.boardSize; k++) {
                    state.lineCoordinates[i + "," + j + "," + k] = 0
                }
            }
        }

        setState(state);
    }

    const fillLine = (event) => {
        var currentCoord = event.target.dataset.coord
        if (state.lineCoordinates[currentCoord] === 0) {
            //event.target.style.backgroundColor =  this.state.turn
            let newState = state.lineCoordinates
            newState[currentCoord] = 1
            setState(prevState => ({
                ...prevState,
                lineCoordinates: newState,
            }))

        }
    }

    const selectColor = (int) => {
        if (int === 0) {
            return ("transparent")
        } else if (int === 1) {
            return ("rgb(255,0,0)")
        } else if (int === -1) {
            return ("rgb(0,0,255)")
        }
    }

    const tint = (event) => {
        var currentCoord = event.target.dataset.coord
        if (state.lineCoordinates[currentCoord] === 0) {
            event.target.style.backgroundColor = "rgba(255,0,0,0.5)"

        }
    }

    const untint = (event) => {
        var currentCoord = event.target.dataset.coord
        if (state.lineCoordinates[currentCoord] === 0) {
            event.target.style.backgroundColor = "transparent"
        }
    }

    const makeBoard = (boardSize) => {
        var cols = [];
        for (let i = 0; i <= 2 * boardSize; i++) {
            var row = []
            for (let j = 0; j <= 2 * boardSize; j++) {
                if (i % 2 === 0) {
                    if (j % 2 === 0) {
                        const element = React.createElement("div",
                            {className: "dot", id: "dot" + Math.floor(i / 2) + "," + Math.floor(j / 2)}
                            , "")
                        row.push(element)
                    } else {
                        row.push(React.createElement("div"
                            , {
                                className: "horizContainer",
                                "data-coord": "0," + Math.floor(i / 2) + "," + Math.floor(j / 2)
                                ,
                                onClick: fillLine,
                                style: {backgroundColor: selectColor(state.lineCoordinates["0," + Math.floor(i / 2) + "," + Math.floor(j / 2)])}
                                ,
                                onMouseEnter: tint,
                                onMouseLeave: untint
                            }
                            , ""))
                    }
                } else {
                    if (j % 2 === 0) {
                        row.push(React.createElement("div"
                            , {
                                className: "vertContainer",
                                "data-coord": "1," + Math.floor(j / 2) + "," + Math.floor(i / 2)
                                ,
                                onClick: fillLine,
                                style: {backgroundColor: selectColor(state.lineCoordinates["1," + Math.floor(j / 2) + "," + Math.floor(i / 2)])}
                                ,
                                onMouseEnter: tint,
                                onMouseLeave: untint
                            }
                            , ""))
                    } else {
                        row.push(React.createElement("div"
                            , {
                                className: "box",
                                id: "box" + Math.floor(i / 2) + ',' + Math.floor(j / 2)
                            }
                            , ""))


                    }
                }
            }
            cols.push(React.createElement("div", {className: "row"}, row))
        }

        return (React.createElement("div", {id: "game-board"}, cols))
    }

    useEffect(()=>{
        initialBoard(2);
    },[])

    return(
        <div className={"flex flex-row items-center justify-center"}>
            <Image src={img} alt={"Level 1"} className={"object-contain aspect-square mix-blend-color-burn"}/>
            {/*<div className={"h-full bg-black p-0.5 pt-40"}></div>*/}
            <div id="game" className={"border-2 border-black pt-3 pb-3"}>
                <div id="board">
                    {makeBoard(state.boardSize)}
                </div>
            </div>
            {/*<div className={"h-full bg-black p-0.5 pt-40"}></div>*/}

        </div>

    )
}