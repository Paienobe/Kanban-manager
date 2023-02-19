import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { Task } from "../../types/types";
import { getCompletedSubtasks } from "../../utils/utils";

type Props = {
  task: Task;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskTile = ({ task, setShowViewModal }: Props) => {
  const { setSelectedTask } = useGlobalContext()!;
  const completedSubtasks = getCompletedSubtasks(task.subtasks).completed;
  const totalSubtasks = getCompletedSubtasks(task.subtasks).total;
  return (
    <div
      className="bg-darkTiles mb-4 text-left p-4 rounded-lg cursor-pointer"
      onClick={() => {
        setSelectedTask(task);
        setShowViewModal(true);
      }}
    >
      <p className="text-darkModeTitle font-semibold">{task.title}</p>
      <p className="text-subtextColor text-sm">
        {completedSubtasks} of {totalSubtasks} subtask{totalSubtasks > 1 && "s"}
      </p>
    </div>
  );
};

export default TaskTile;
