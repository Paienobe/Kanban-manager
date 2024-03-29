import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import { SelectedTask, Task } from "../../types/types";
import { getCompletedSubtasks } from "../../utils/utils";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  task: Task;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTask>>;
  index: number;
};

const TaskTile = ({
  index,
  task,
  setShowViewModal,
  setSelectedTask,
}: Props) => {
  const completedSubtasks = getCompletedSubtasks(task.subtasks).completed;

  const totalSubtasks = getCompletedSubtasks(task.subtasks).total;

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => {
        return (
          <div
            className="bg-lightTiles dark:bg-darkTiles mb-4 text-left p-4 rounded-lg cursor-pointer transition-[background] duration-300 ease-in-out"
            onClick={() => {
              setSelectedTask({ id: task.id, status: task.status });
              setShowViewModal(true);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p className=" text-lightModeTitle dark:text-darkModeTitle font-semibold">
              {task.title}
            </p>
            <p className="text-subtextColor text-sm">
              {completedSubtasks} of {totalSubtasks} subtask
              {totalSubtasks > 1 && "s"}
            </p>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskTile;
