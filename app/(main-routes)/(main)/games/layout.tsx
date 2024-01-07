import React from "react";
import ToggleButton from "@/components/ToggleButton";

const GameLayout = ({children}: { children: React.ReactNode }) => {
    return (

        <div className="mt-5 h-full flex flex-col items-center justify-center align-middle">
            {children}
        </div>


    );
}

export default GameLayout;