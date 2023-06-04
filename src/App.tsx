import { useEffect, useState } from "react";
import "./App.css";
import AllBoardsModal from "./components/AllBoardsModal/AllBoardsModal";
import BoardForm from "./components/BoardForm/BoardForm";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Navbar from "./components/Navbar/Navbar";
import TasksContainer from "./components/TasksContainer/TasksContainer";
import { useGlobalContext } from "./context/globalContext";
import TaskForm from "./components/TaskForm/TaskForm";
import ColumnForm from "./components/ColumnForm/ColumnForm";
import { SelectedTask } from "./types/types";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import {
  updateDragAndDropAcrossColumns,
  updateDragAndDropInSameColumn,
} from "./utils/utils";
import SidebarViewer from "./components/SidebarViewer/SidebarViewer";

function App() {
  const {
    showDeleteModal,
    setShowDeleteModal,
    currentBoard,
    appData,
    setAppData,
    setEditTask,
    setIsLarge,
    hideSidebar,
  } = useGlobalContext()!;
  const [showBoardsModal, setShowBoardsModal] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SelectedTask>({
    id: "",
    status: "",
  });

  useEffect(() => {
    if (!showTaskForm) {
      setEditTask(false);
    }
  }, [showTaskForm]);

  window.addEventListener("resize", () => {
    if (!(window.innerWidth >= 768)) {
      setShowBoardsModal(false);
    }
    setIsLarge(window.innerWidth >= 768);
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const startColumn = currentBoard.columns.find((column) => {
      return column.name === source.droppableId;
    });

    const endColumn = currentBoard.columns.find((column) => {
      return column.name === destination!.droppableId;
    });

    const movedTask = startColumn?.tasks[source.index];

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (startColumn?.id === endColumn?.id) {
      const moveData = updateDragAndDropInSameColumn(
        startColumn,
        movedTask,
        destination,
        currentBoard,
        appData
      );

      setAppData(moveData);
    }

    if (startColumn?.id !== endColumn?.id) {
      const moveData = updateDragAndDropAcrossColumns(
        startColumn,
        endColumn,
        movedTask,
        destination,
        currentBoard,
        appData
      );

      setAppData(moveData);
    }
  };

  return (
    <div className="App bg-lightBg dark:bg-darkBg min-h-screen transition-all duration-300 ease-in-out md:flex md:max-h-[100vh] md:w-full md:overflow-auto">
      <Navbar
        showBoardsModal={showBoardsModal}
        setShowBoardsModal={setShowBoardsModal}
        setShowTaskForm={setShowTaskForm}
        showBoardForm={showBoardForm}
        setShowBoardForm={setShowBoardForm}
      />

      {showBoardsModal && (
        <AllBoardsModal
          showBoardsModal={showBoardsModal}
          setShowBoardsModal={setShowBoardsModal}
          setShowBoardForm={setShowBoardForm}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showBoardForm && (
        <BoardForm
          showBoardForm={showBoardForm}
          setShowBoardForm={setShowBoardForm}
        />
      )}

      {showTaskForm && (
        <TaskForm
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}

      {showColumnForm && (
        <ColumnForm
          showColumnForm={showColumnForm}
          setShowColumnForm={setShowColumnForm}
        />
      )}

      {hideSidebar && <SidebarViewer />}

      <DragDropContext onDragEnd={onDragEnd}>
        <TasksContainer
          setShowColumnForm={setShowColumnForm}
          setShowTaskForm={setShowTaskForm}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          setShowBoardForm={setShowBoardForm}
        />
      </DragDropContext>
    </div>
  );
}

export default App;
