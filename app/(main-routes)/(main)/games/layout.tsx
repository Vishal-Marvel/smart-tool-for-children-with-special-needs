import React from "react";

const GameLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className={"flex flex-col"}>

        <div className=" flex items-center justify-center">
                {children}
            </div>

        </div>

    );
}

export default GameLayout;