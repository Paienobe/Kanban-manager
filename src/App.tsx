import { useState } from "react";
import "./App.css";
import AllBoardsModal from "./components/AllBoardsModal/AllBoardsModal";
import Navbar from "./components/Navbar/Navbar";
import TasksContainer from "./components/TasksContainer/TasksContainer";

function App() {
  const [showBoardsModal, setShowBoardsModal] = useState(false);
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
        />
      )}
    </div>
  );
}

export default App;
