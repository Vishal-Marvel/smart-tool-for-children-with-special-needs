import React from "react";
import GameContextProvider from "@/components/context/gameContext";
// import "../flip.css";

export default function GameLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <GameContextProvider>
        {children}
      </GameContextProvider>
  );
}
