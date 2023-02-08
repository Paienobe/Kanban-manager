import React from "react";
import { Task } from "../../types/types";
import { getCompletedSubtasks } from "../../utils/utils";

type Props = {
  task: Task;
};

const TaskTile = ({ task }: Props) => {
  return (
    <div className="bg-darkTiles mb-4 text-left p-4 rounded-lg shadow-subtextColor shadow">
      <p className="text-darkModeTitle">{task.title}</p>
      <p className="text-subtextColor">{getCompletedSubtasks(task.subtasks)}</p>
    </div>
  );
};

export default TaskTile;
