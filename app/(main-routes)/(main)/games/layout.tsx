import React from "react";
import ToggleButton from "@/components/ToggleButton";

const GameLayout = ({children}: { children: React.ReactNode }) => {
    return (

        <div className="h-screen flex flex-col items-center">
            {children}
        </div>


    );
}

export default GameLayout;