import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import TaskTile from "../TaskTiles/TaskTile";
import { MdCircle } from "react-icons/md";
import TaskModal from "../TaskModal/TaskModal";
import { SelectedTask, Task } from "../../types/types";
import { columnHexCodes } from "../../constants/constants";

const TasksContainer = () => {
  const { currentBoard } = useGlobalContext()!;

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<SelectedTask>({
    id: "",
    status: "",
  });

  const boardsAreAvailable = currentBoard?.columns.length > 0;

  const checkForDuplicateColumns = () => {
    // columnInputs.
  };

  return (
    <div className="p-4 flex gap-x-4 items-start justify-between overflow-x-auto min-h-screen">
      {boardsAreAvailable ? (
        <>
          {currentBoard?.columns.map((column, index) => {
            return (
              <div key={column.id} className="min-w-[90%] mt-[80px]">
                <div className="flex items-center">
                  <MdCircle color={columnHexCodes[index]} />
                  <p className="text-subtextColor text-left ml-2">
                    {column?.name.toUpperCase()} ({column.tasks.length})
                  </p>
                </div>

                <div
                  className={`mt-5  ${
                    column.tasks.length < 1
                      ? "border-2 border-opacity-30 border-dashed border-subtextColor min-h-[75vh]"
                      : ""
                  } rounded-lg`}
                >
                  {column.tasks.map((task) => {
                    return (
                      <TaskTile
                        key={task.id}
                        task={task}
                        setShowViewModal={setShowViewModal}
                        setSelectedTask={setSelectedTask}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center">
          <p className="text-subtextColor text-lg font-medium">
            There are no boards. Create a new board to get started.
          </p>
          <button className="bg-purple text-white p-2 rounded-full mt-4 w-[60%] font-medium">
            +Create New Board
          </button>
        </div>
      )}

      {showViewModal && (
        <TaskModal
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          selectedTask={selectedTask}
        />
      )}
    </div>
  );
};

export default TasksContainer;
