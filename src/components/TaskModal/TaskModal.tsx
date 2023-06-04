import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import {
  detectOutsideClick,
  getCompletedSubtasks,
  getCurrentColumn,
  getViewedTask,
} from "../../utils/utils";
import uuid from "react-uuid";
import {
  AppDataType,
  Board,
  Column,
  SelectedTask,
  Subtask,
  Task,
} from "../../types/types";
import StatusDropDown from "../StatusDropdown/StatusDropDown";
import TaskToggle from "../TaskToggle/TaskToggle";

type Props = {
  showViewModal: boolean;
  setShowViewModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: SelectedTask;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTask>>;
};

const TaskModal = ({
  showViewModal,
  setShowViewModal,
  selectedTask,
  setShowTaskForm,
  setSelectedTask,
}: Props) => {
  const {
    currentBoard,
    setAppData,
    appData,
    setShowDeleteModal,
    setDeleteItem,
    setEditTask,
  } = useGlobalContext()!;

  const optionsRef = useRef<HTMLDivElement>(null);

  const [showOptions, setShowOptions] = useState(false);

  const currentColumn = getCurrentColumn(currentBoard, selectedTask);

  const viewedTask = getViewedTask(currentColumn!, selectedTask);

  const completedSubtasks = getCompletedSubtasks(
    viewedTask?.subtasks!
  ).completed;

  const totalSubtasks = getCompletedSubtasks(viewedTask?.subtasks!).total;

  const availableStatuses = currentBoard.columns.map((column) => {
    return column.name;
  });

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

  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      detectOutsideClick(e, optionsRef, showOptions, setShowOptions)
    );
    return () => {
      document.removeEventListener("mousedown", (e) =>
        detectOutsideClick(e, optionsRef, showOptions, setShowOptions)
      );
    };
  }, [showOptions]);

  const chosenTask = { id: viewedTask?.id!, status: viewedTask?.status! };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showViewModal, setShowViewModal);
      }}
    >
      <div
        className="bg-lightTiles dark:bg-darkTiles p-4 rounded-xl w-[90%] md:w-[65%] text-left max-h-[85vh] overflow-y-auto"
        ref={modalRef}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-lightModeTitle dark:text-darkModeTitle text-xl font-semibold">
            {viewedTask?.title}
          </h1>
          <img
            className="cursor-pointer"
            src={moreIcon}
            alt="more_icon"
            onClick={() => setShowOptions(!showOptions)}
          />

          {showOptions && (
            <div
              className="absolute bg-lightBg border border-subtextColor border-opacity-25 dark:bg-darkBg top-[12rem] right-8 p-4 rounded-lg text-left w-[50%] md:w-[25%] md:right-[20vw]"
              ref={optionsRef}
            >
              <p
                className="text-subtextColor font-medium pb-2"
                onClick={() => {
                  setShowViewModal(false);
                  setShowTaskForm(true);
                  setEditTask(true);
                  setSelectedTask(chosenTask);
                }}
              >
                Edit Task
              </p>
              <p
                className="text-red font-medium"
                onClick={() => {
                  setShowViewModal(false);
                  setShowDeleteModal(true);
                  setDeleteItem({
                    status: true,
                    id: viewedTask?.id!,
                    type: "task",
                  });
                  setShowOptions(false);
                }}
              >
                Delete Task
              </p>
            </div>
          )}
        </div>

        <p className="text-subtextColor py-2">
          {viewedTask?.description || "No description"}
        </p>

        <p className="text-lightModeTitle dark:text-darkModeTitle py-2 font-medium">
          Subtasks({completedSubtasks} of {totalSubtasks})
        </p>

        <div>
          {viewedTask?.subtasks.map((subtask) => {
            return (
              <TaskToggle
                key={uuid()}
                subtask={subtask}
                updatedSubtask={updatedSubtask}
              />
            );
          })}
        </div>

        <div>
          <p className="text-lightModeTitle dark:text-darkModeTitle font-medium mt-4">
            Current Status
          </p>
          <div>
            <StatusDropDown
              selectedStatus={viewedTask?.status!}
              availableStatuses={availableStatuses}
              updateTaskColumn={updateTaskColumn}
              forUpdate={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
