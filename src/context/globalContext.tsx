import React, { createContext, useContext, useState } from "react";
import data from "../data/data.json";
import { AppDataType, Board } from "../types/types";

type ContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<AppDataType>>;
  currentBoardIndex: number;
  setCurrentBoardIndex: React.Dispatch<React.SetStateAction<number>>;
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>;
};

const AppContext = createContext<ContextType | null>(null);

type ProviderProps = { children: React.ReactNode };

const AppProvider = ({ children }: ProviderProps) => {
  const [appData, setAppData] = useState<AppDataType>(data);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [currentBoard, setCurrentBoard] = useState(
    appData.boards[currentBoardIndex]
  );

  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
        currentBoardIndex,
        setCurrentBoardIndex,
        currentBoard,
        setCurrentBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
