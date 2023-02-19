import React, { useState, useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import { detectOutsideClick, getCompletedSubtasks } from "../../utils/utils";
import uuid from "react-uuid";
import checkMark from "../../assets/icon-check.svg";
import downIcon from "../../assets/icon-chevron-down.svg";

type Props = {
  taskIsSelected: boolean;
  setTaskIsSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskModal = ({ taskIsSelected, setTaskIsSelected }: Props) => {
  const { selectedTask, currentBoard } = useGlobalContext()!;
  const completedSubtasks = getCompletedSubtasks(
    selectedTask!.subtasks
  ).completed;
  const totalSubtasks = getCompletedSubtasks(selectedTask!.subtasks).total;
  const availableStatuses = currentBoard.columns.map((column) => {
    return column.name;
  });
  const [showStatuses, setShowStatuses] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, taskIsSelected, setTaskIsSelected);
      }}
    >
      <div
        className="bg-darkTiles p-4 rounded-xl w-[90%] text-left max-h-[85vh] overflow-y-auto"
        ref={modalRef}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-darkModeTitle text-xl font-semibold">
            {selectedTask?.title}
          </h1>
          <img src={moreIcon} alt="more_icon" />
        </div>

        <p className="text-subtextColor py-2">{selectedTask?.description}</p>

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
                  className={`min-w-[20px] min-h-[20px] rounded-md ${
                    subtask.isCompleted ? "bg-purple" : "bg-darkTiles"
                  } mr-4 flex items-center justify-center border border-subtextColor border-opacity-30`}
                >
                  {subtask.isCompleted && <img src={checkMark} alt="" />}
                </div>
                <p
                  className={`${
                    subtask.isCompleted
                      ? "text-subtextColor line-through"
                      : "text-white"
                  } font-medium text-sm`}
                >
                  {subtask.title}
                </p>
              </div>
            );
          })}
        </div>

        <div>
          <p className="text-darkModeTitle font-medium mt-4">Current Status</p>
          <div>
            <div
              className="border border-purple px-2 py-3 rounded-md my-2 flex items-center justify-between"
              onClick={() => {
                setShowStatuses(!showStatuses);
              }}
            >
              <p className="text-darkModeTitle text-sm">
                {selectedTask?.status}
              </p>
              <img src={downIcon} alt="" />
            </div>
            <div
              className={`bg-darkBg px-2 ${
                showStatuses ? "py-3" : "py-0"
              } rounded-md overflow-hidden ${
                showStatuses
                  ? "max-h-[1000px] transition-[max-height] duration-300 ease-in"
                  : "max-h-[0px] transition-[max-height] duration-300 ease-smooth"
              }`}
            >
              {availableStatuses.map((status) => {
                return (
                  <p key={uuid()} className={`text-subtextColor pb-2 text-sm`}>
                    {status}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
