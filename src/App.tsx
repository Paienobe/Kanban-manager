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

function App() {
  const { showDeleteModal, setShowDeleteModal } = useGlobalContext()!;
  const [showBoardsModal, setShowBoardsModal] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showColumnForm, setShowColumnForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SelectedTask>({
    id: "",
    status: "",
  });

  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };

  return (
    <div className="App bg-lightBg dark:bg-darkBg min-h-screen transition-all duration-300 ease-in-out">
      <Navbar
        showBoardsModal={showBoardsModal}
        setShowBoardsModal={setShowBoardsModal}
        setShowTaskForm={setShowTaskForm}
        showBoardForm={showBoardForm}
        setShowBoardForm={setShowBoardForm}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <TasksContainer
          setShowColumnForm={setShowColumnForm}
          setShowTaskForm={setShowTaskForm}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          setShowBoardForm={setShowBoardForm}
        />
      </DragDropContext>

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
    </div>
  );
}

export default App;
