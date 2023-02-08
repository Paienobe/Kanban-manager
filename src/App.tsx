import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TasksContainer from "./components/TasksContainer/TasksContainer";

function App() {
  return (
    <div className="App bg-darkBg min-h-screen">
      <Navbar />
      <TasksContainer />
    </div>
  );
}

export default App;
