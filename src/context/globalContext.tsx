import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json";
import { AppDataType, Board, Task } from "../types/types";

type ContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<AppDataType>>;
  currentBoardIndex: number;
  setCurrentBoardIndex: React.Dispatch<React.SetStateAction<number>>;
  currentBoard: Board;
  setCurrentBoard: React.Dispatch<React.SetStateAction<Board>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

const AppContext = createContext<ContextType | null>(null);

type ProviderProps = { children: React.ReactNode };

const AppProvider = ({ children }: ProviderProps) => {
  const [appData, setAppData] = useState<AppDataType>(data);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const [currentBoard, setCurrentBoard] = useState(
    appData.boards[currentBoardIndex]
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    setCurrentBoard(appData.boards[currentBoardIndex]);
  }, [currentBoardIndex]);

  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
        currentBoardIndex,
        setCurrentBoardIndex,
        currentBoard,
        setCurrentBoard,
        selectedTask,
        setSelectedTask,
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
