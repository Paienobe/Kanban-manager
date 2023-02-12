import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import TaskTile from "../TaskTiles/TaskTile";
import { MdCircle } from "react-icons/md";
import TaskModal from "../TaskModal/TaskModal";

const TasksContainer = () => {
  const { currentBoard, selectedTask } = useGlobalContext()!;
  const columnHexCodes = [
    "#49C4E5",
    "#635fc7",
    "#67E2AE",
    "#e5a449",
    "#2a3fdb",
    "#c36e6e",
  ];
  return (
    <div className="p-4 flex gap-x-4 items-start justify-between overflow-x-auto min-h-screen">
      {currentBoard.columns.map((column, index) => {
        return (
          <div key={column.id} className="min-w-[90%] mt-[80px]">
            <div className="flex items-center">
              <MdCircle color={columnHexCodes[index]} />
              <p className="text-subtextColor text-left ml-2">
                {column.name.toUpperCase()} ({column.tasks.length})
              </p>
            </div>
            ;
            {column.tasks.map((task) => {
              return <TaskTile key={task.id} task={task} />;
            })}
          </div>
        );
      })}
      {selectedTask && <TaskModal />}
    </div>
  );
};

export default TasksContainer;
