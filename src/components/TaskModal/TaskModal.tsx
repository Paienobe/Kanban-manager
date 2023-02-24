import React, { useState, useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import { detectOutsideClick, getCompletedSubtasks } from "../../utils/utils";
import uuid from "react-uuid";
import checkMark from "../../assets/icon-check.svg";
import downIcon from "../../assets/icon-chevron-down.svg";
import {
  AppDataType,
  Board,
  Column,
  SelectedTask,
  Subtask,
  Task,
} from "../../types/types";

type Props = {
  showViewModal: boolean;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: SelectedTask;
};

const TaskModal = ({
  showViewModal,
  setShowViewModal,
  selectedTask,
}: Props) => {
  const { currentBoard, setAppData, appData } = useGlobalContext()!;

  const currentColumn = currentBoard.columns.find((column) => {
    return column.tasks.find((task) => {
      return task.id === selectedTask!.id;
    });
  });

  const viewedTask = currentColumn?.tasks.find((task) => {
    return task.id === selectedTask.id;
  });

  const completedSubtasks = getCompletedSubtasks(
    viewedTask!.subtasks
  ).completed;

  const totalSubtasks = getCompletedSubtasks(viewedTask!.subtasks).total;

  const availableStatuses = currentBoard.columns.map((column) => {
    return column.name;
  });

  const [showStatuses, setShowStatuses] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const updatedSubtask = (subtask: Subtask) => {
    let subtaskToBeUpdated: Subtask = subtask;

    if (subtaskToBeUpdated.isCompleted) {
      subtaskToBeUpdated = { ...subtaskToBeUpdated!, isCompleted: false };
    } else {
      subtaskToBeUpdated = { ...subtaskToBeUpdated!, isCompleted: true };
    }

    const updatedParentTask: Task = {
      ...viewedTask!,
      subtasks: viewedTask!.subtasks.map((subtask) => {
        if (subtask.title === subtaskToBeUpdated.title) {
          return subtaskToBeUpdated;
        } else return subtask;
      }),
    };

    const updatedCurrentColumn = {
      ...currentColumn!,
      tasks: currentColumn!.tasks.map((task) => {
        if (task.id === viewedTask?.id) {
          return updatedParentTask;
        } else return task;
      }),
    };

    const updatedCurrentBoard: Board = {
      ...currentBoard!,
      columns: currentBoard.columns.map((column) => {
        if (column.id === updatedCurrentColumn.id) {
          return updatedCurrentColumn;
        } else return column;
      }),
    };

    const updatedAppData: AppDataType = {
      boards: appData.boards.map((board) => {
        if (board.id === updatedCurrentBoard.id) {
          return updatedCurrentBoard;
        } else return board;
      }),
    };

    setAppData(updatedAppData);
  };

  const updateTaskColumn = (status: string) => {
    const updatedCurrentTask = { ...viewedTask!, status };

    const statusIsInColumn = status === currentColumn?.name;

    const updatedColumn: Column = {
      ...currentColumn!,
      tasks: statusIsInColumn
        ? currentColumn.tasks.map((task) => {
            if (task.id === viewedTask?.id) {
              return updatedCurrentTask;
            } else return task;
          })
        : currentColumn!.tasks.filter((task) => {
            return task.id !== viewedTask?.id;
          }),
    };

    const updatedCurrentBoard: Board = {
      ...currentBoard,
      columns: currentBoard.columns.map((column) => {
        if (column.id === currentColumn?.id) {
          return updatedColumn;
        } else if (column.name === status) {
          return { ...column, tasks: [...column.tasks, updatedCurrentTask] };
        } else {
          return column;
        }
      }),
    };

    const updatedAppData: AppDataType = {
      boards: appData.boards.map((board) => {
        if (board.id === currentBoard.id) {
          return updatedCurrentBoard;
        } else return board;
      }),
    };

    setAppData(updatedAppData);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showViewModal, setShowViewModal);
      }}
    >
      <div
        className="bg-darkTiles p-4 rounded-xl w-[90%] text-left max-h-[85vh] overflow-y-auto"
        ref={modalRef}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-darkModeTitle text-xl font-semibold">
            {viewedTask?.title}
          </h1>
          <img src={moreIcon} alt="more_icon" />
        </div>

        <p className="text-subtextColor py-2">
          {viewedTask?.description || "No description"}
        </p>

        <p className="text-darkModeTitle py-2 font-medium">
          Subtasks({completedSubtasks} of {totalSubtasks})
        </p>

        <div>
          {viewedTask?.subtasks.map((subtask) => {
            return (
              <div
                key={uuid()}
                className="flex items-center my-2 bg-darkBg p-3 rounded-md"
              >
                <div
                  className={`min-w-[20px] min-h-[20px] rounded-md ${
                    subtask.isCompleted ? "bg-purple" : "bg-darkTiles"
                  } mr-4 flex items-center justify-center border border-subtextColor border-opacity-30`}
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
              <p className="text-darkModeTitle text-sm">{viewedTask?.status}</p>
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
                  <p
                    key={uuid()}
                    className={`text-subtextColor pb-2 text-sm`}
                    onClick={() => {
                      updateTaskColumn(status);
                      setShowStatuses(!showStatuses);
                    }}
                  >
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
