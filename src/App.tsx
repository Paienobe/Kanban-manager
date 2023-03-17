import { useState } from "react";
import "./App.css";
import AllBoardsModal from "./components/AllBoardsModal/AllBoardsModal";
import BoardForm from "./components/BoardForm/BoardForm";
import DeleteModal from "./components/DeleteModal/DeleteModal";
import Navbar from "./components/Navbar/Navbar";
import TasksContainer from "./components/TasksContainer/TasksContainer";
import { useGlobalContext } from "./context/globalContext";

function App() {
  const { deleteItem, showDeleteModal, setShowDeleteModal } =
    useGlobalContext()!;
  const [showBoardsModal, setShowBoardsModal] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);

  return (
    <div className="App bg-lightBg dark:bg-darkBg min-h-screen transition-all duration-300 ease-in-out">
      <Navbar
        showBoardsModal={showBoardsModal}
        setShowBoardsModal={setShowBoardsModal}
      />

      <TasksContainer />

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

      <BoardForm />
    </div>
  );
}

export default App;
