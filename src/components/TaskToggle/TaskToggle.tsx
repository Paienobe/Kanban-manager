import React from "react";
import { Subtask } from "../../types/types";
import checkMark from "../../assets/icon-check.svg";

type Props = {
  subtask: Subtask;
  updatedSubtask: (subtask: Subtask) => void;
};

const TaskToggle = ({ subtask, updatedSubtask }: Props) => {
  return (
    <div className="flex items-center my-2 bg-lightBg dark:bg-darkBg p-3 rounded-md">
      <div
        className={`min-w-[20px] min-h-[20px] rounded-md ${
          subtask.isCompleted ? "bg-purple" : "bg-lightTiles dark:bg-darkTiles"
        } mr-4 flex items-center justify-center border border-subtextColor border-opacity-30 cursor-pointer`}
        onClick={() => {
          updatedSubtask(subtask);
        }}
      >
        {subtask.isCompleted && <img src={checkMark} alt="" />}
      </div>
      <p
        className={`${
          subtask.isCompleted
            ? "text-subtextColor line-through"
            : "text-black dark:text-white"
        } font-medium text-sm`}
      >
        {subtask.title}
      </p>
    </div>
  );
};

export default TaskToggle;
