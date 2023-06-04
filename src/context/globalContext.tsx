import React, { createContext, useContext, useState, useEffect } from "react";
import data from "../data/data.json";
import { AppDataType, Board, DeleteType, Task } from "../types/types";
import { getPreservedAppData, getPreservedBoardIndex } from "../utils/utils";

type ContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<AppDataType>>;
  currentBoardIndex: number;
  setCurrentBoardIndex: React.Dispatch<React.SetStateAction<number>>;
  currentBoard: Board;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  deleteItem: DeleteType;
  setDeleteItem: React.Dispatch<React.SetStateAction<DeleteType>>;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  editBoard: boolean;
  setEditBoard: React.Dispatch<React.SetStateAction<boolean>>;
  editTask: boolean;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  isLarge: boolean;
  setIsLarge: React.Dispatch<React.SetStateAction<boolean>>;
  hideSidebar: boolean;
  toggleSidebar: () => void;
};

const AppContext = createContext<ContextType | null>(null);

type ProviderProps = { children: React.ReactNode };

const AppProvider = ({ children }: ProviderProps) => {
  const [appData, setAppData] = useState<AppDataType>(getPreservedAppData());
  const [currentBoardIndex, setCurrentBoardIndex] = useState(
    getPreservedBoardIndex()
  );
  const currentBoard = appData.boards[currentBoardIndex];
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<DeleteType>({
    status: false,
    type: "",
    id: "",
  });
  const [editBoard, setEditBoard] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 768);
  const [hideSidebar, setHideSidebar] = useState(false);

  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };

  useEffect(() => {
    const documentElement = document.documentElement;
    documentElement.classList.remove(theme === "dark" ? "light" : "dark");
    documentElement.classList.add(theme);
  }, [theme]);

  const preserveAppData = () => {
    localStorage.setItem("kanban_data", JSON.stringify(appData));
  };

  const preserveBoardIndex = () => {
    localStorage.setItem(
      "kanban_board_index",
      JSON.stringify(currentBoardIndex)
    );
  };

  useEffect(() => {
    preserveBoardIndex();
  }, [currentBoardIndex]);

  useEffect(() => {
    preserveAppData();
  }, [appData]);

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
        deleteItem,
        setDeleteItem,
        showDeleteModal,
        setShowDeleteModal,
        editBoard,
        setEditBoard,
        editTask,
        setEditTask,
        isLarge,
        setIsLarge,
        hideSidebar,
        toggleSidebar,
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
