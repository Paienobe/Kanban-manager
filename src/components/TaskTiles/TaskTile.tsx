import React from "react";
import { Task } from "../../types/types";
import { getCompletedSubtasks } from "../../utils/utils";

type Props = {
  task: Task;
};

const TaskTile = ({ task }: Props) => {
  return (
    <div className="bg-darkTiles mb-4 text-left p-4 rounded-lg">
      <p className="text-darkModeTitle font-semibold">{task.title}</p>
      <p className="text-subtextColor text-sm">
        {getCompletedSubtasks(task.subtasks)}
      </p>
    </div>
  );
};

export default TaskTile;
