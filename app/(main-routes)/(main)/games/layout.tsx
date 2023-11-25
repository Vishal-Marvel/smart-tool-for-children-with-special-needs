import React from "react";
import ToggleButton from "@/components/ToggleButton";

const GameLayout = ({children}: { children: React.ReactNode }) => {
    return (

        <div className="h-[98vh] flex items-center justify-center align-middle">
            <div className={"absolute top-0 right-0 p-2"}>
                <ToggleButton/>

            </div>
            {children}
        </div>


    );
}

export default GameLayout;