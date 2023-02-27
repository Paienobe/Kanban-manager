import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json";
import { AppDataType, Board, Task } from "../types/types";

type ContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<AppDataType>>;
  currentBoardIndex: number;
  setCurrentBoardIndex: React.Dispatch<React.SetStateAction<number>>;
  currentBoard: Board;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
};

const AppContext = createContext<ContextType | null>(null);

type ProviderProps = { children: React.ReactNode };

const AppProvider = ({ children }: ProviderProps) => {
  const [appData, setAppData] = useState<AppDataType>(data);
  const [currentBoardIndex, setCurrentBoardIndex] = useState(0);
  const currentBoard = appData.boards[currentBoardIndex];
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const documentElement = document.documentElement;
    documentElement.classList.remove(theme === "dark" ? "light" : "dark");
    documentElement.classList.add(theme);
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        appData,
        setAppData,
        currentBoardIndex,
        setCurrentBoardIndex,
        currentBoard,
        theme,
        setTheme,
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
