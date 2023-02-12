import React from "react";
import { useGlobalContext } from "../../context/globalContext";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import { getCompletedSubtasks } from "../../utils/utils";
import uuid from "react-uuid";
import checkMark from "../../assets/icon-check.svg";

const TaskModal = () => {
  const { selectedTask, setSelectedTask } = useGlobalContext()!;
  const completedSubtasks = getCompletedSubtasks(
    selectedTask!.subtasks
  ).completed;
  const totalSubtasks = getCompletedSubtasks(selectedTask!.subtasks).total;
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-darkTiles p-4 rounded-xl w-[90%] text-left max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-darkModeTitle text-xl font-semibold">
            {selectedTask?.title}
          </h1>
          <img src={moreIcon} alt="more_icon" />
        </div>

        <p className="text-darkModeTitle py-2 font-medium">
          Subtasks({completedSubtasks} of {totalSubtasks})
        </p>

        <div>
          {selectedTask?.subtasks.map((subtask) => {
            return (
              <div
                key={uuid()}
                className="flex items-center my-2 bg-darkBg p-3 rounded-md"
              >
                <div
                  className={`w-[20px] h-[20px] rounded-md ${
                    subtask.isCompleted ? "bg-purple" : "bg-darkBg"
                  } mr-4 flex items-center justify-center border border-subtextColor border-opacity-30`}
                >
                  {subtask.isCompleted && <img src={checkMark} alt="" />}
                </div>
                <p
                  className={`${
                    subtask.isCompleted
                      ? "text-subtextColor line-through"
                      : "text-white"
                  } font-medium`}
                >
                  {subtask.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
