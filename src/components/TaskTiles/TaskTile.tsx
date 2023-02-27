import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { SelectedTask, Task } from "../../types/types";
import { getCompletedSubtasks } from "../../utils/utils";

type Props = {
  task: Task;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTask>>;
};

const TaskTile = ({ task, setShowViewModal, setSelectedTask }: Props) => {
  const completedSubtasks = getCompletedSubtasks(task.subtasks).completed;

  const totalSubtasks = getCompletedSubtasks(task.subtasks).total;

  return (
    <div
      className="bg-lightTiles dark:bg-darkTiles  mb-4 text-left p-4 rounded-lg cursor-pointer transition-[background] duration-300 ease-in-out"
      onClick={() => {
        setSelectedTask({ id: task.id, status: task.status });
        setShowViewModal(true);
      }}
    >
      <p className=" text-lightModeTitle dark:text-darkModeTitle font-semibold">
        {task.title}
      </p>
      <p className="text-subtextColor text-sm">
        {completedSubtasks} of {totalSubtasks} subtask{totalSubtasks > 1 && "s"}
      </p>
    </div>
  );
};

export default TaskTile;
