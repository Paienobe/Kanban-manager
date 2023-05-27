import React, { useRef, useState } from "react";
import {
  addDynamicInput,
  detectOutsideClick,
  getCurrentColumn,
  getViewedTask,
} from "../../utils/utils";
import uuid from "react-uuid";
import downIcon from "../../assets/icon-chevron-down.svg";
import { useGlobalContext } from "../../context/globalContext";
import { DynamicInput, SelectedTask, Task } from "../../types/types";
import DynamicInputField from "../DynamicInputField/DynamicInputField";
import StatusDropDown from "../StatusDropdown/StatusDropDown";

type Props = {
  showTaskForm: boolean;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: SelectedTask;
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTask>>;
};

const TaskForm = ({
  showTaskForm,
  setShowTaskForm,
  selectedTask,
  setSelectedTask,
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { currentBoard, appData, setAppData, editTask } = useGlobalContext()!;

  const currentColumn = getCurrentColumn(currentBoard, selectedTask);

  const viewedTask = getViewedTask(currentColumn!, selectedTask);

  const currentTaskSubtasks = viewedTask?.subtasks.map((subtask) => {
    return { id: uuid(), value: subtask.title };
  });

  const defaultSubtasks = [{ id: uuid(), value: "" }];

  const [subtaskInputs, setSubtaskInputs] = useState<DynamicInput[]>(
    editTask ? currentTaskSubtasks! : defaultSubtasks
  );
  const [inputsWithDuplicates, setInputWithDuplicates] = useState<
    (string | number)[]
  >([]);

  const availableStatuses = currentBoard.columns.map((column) => {
    return column.name;
  });

  const [selectedStatus, setSelectedStatus] = useState(
    editTask ? viewedTask?.status! : availableStatuses[0]
  );
  const [showStatuses, setShowStatuses] = useState(false);
  const [duplicateTask, setDuplicateTask] = useState(false);

  const checkForDuplicateTask = (text: string) => {
    const hasDuplicates = currentBoard.columns.some((column) => {
      return column.tasks.some((task) => {
        return task.title.toLowerCase() === text.toLowerCase();
      });
    });
    setDuplicateTask(hasDuplicates);
  };

  const createNewTask = () => {
    if (formRef.current) {
      const newTask: Task = {
        id: uuid(),
        title: formRef.current.task_title.value,
        description: formRef.current.task_description.value,
        status: selectedStatus,
        statusId: uuid(),
        subtasks: subtaskInputs.map((input) => {
          return { title: input.value, isCompleted: false };
        }),
      };

      const updatedCurrentBoard = {
        ...currentBoard,
        columns: currentBoard.columns.map((column) => {
          if (column.name === selectedStatus) {
            return { ...column, tasks: [...column.tasks, newTask] };
          } else return column;
        }),
      };

      const updatedAppData = {
        ...appData,
        boards: appData.boards.map((board) => {
          if (board.id === currentBoard.id) {
            return updatedCurrentBoard;
          } else return board;
        }),
      };

      setAppData(updatedAppData);
      setShowTaskForm(false);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showTaskForm, setShowTaskForm);
      }}
    >
      <div
        className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out p-4 rounded-xl w-[90%] text-left max-h-[90vh] overflow-y-auto"
        ref={modalRef}
      >
        <h1 className="text-lightModeTitle dark:text-darkModeTitle text-xl font-semibold mb-4">
          {!editTask ? "Add New Task" : "Edit Task"}
        </h1>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            createNewTask();
          }}
        >
          <div className="relative">
            <label
              htmlFor="task title"
              className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              name="task_title"
              placeholder="e.g. Take coffee break"
              required
              className={`p-2 rounded bg-transparent border w-full text-lightModeTitle dark:text-darkModeTitle outline-none ${
                !true ? "border-red" : "border-subtextColor"
              }`}
              defaultValue={!editTask ? "" : viewedTask?.title}
              onChange={(e) => {
                checkForDuplicateTask(e.target.value);
              }}
            />
            {duplicateTask && (
              <p className="absolute top-[55%] right-[2.5%] font-semibold text-red">
                Used
              </p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="task description"
              className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              name="task_description"
              placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
              required
              rows={3}
              defaultValue={!editTask ? "" : viewedTask?.description}
              className={`p-2 rounded bg-transparent border w-full text-lightModeTitle dark:text-darkModeTitle outline-none ${
                !true ? "border-red" : "border-subtextColor"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="board columns"
              className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mt-4 mb-2"
            >
              Subtasks
            </label>
            {subtaskInputs.map((input, index) => {
              const placeholderText =
                index === 0
                  ? "e.g. Make coffee"
                  : index === 1
                  ? "e.g. Drink coffee & smile"
                  : "Your subtask title...";

              const hasADuplicateValue = inputsWithDuplicates.some((item) => {
                return item === input.id;
              });

              return (
                <DynamicInputField
                  key={input.id}
                  input={input}
                  hasADuplicateValue={hasADuplicateValue}
                  columnInputs={subtaskInputs}
                  setColumnInputs={setSubtaskInputs}
                  placeholderText={placeholderText}
                  inputsWithDuplicates={inputsWithDuplicates}
                  setInputWithDuplicates={setInputWithDuplicates}
                />
              );
            })}
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="block w-full py-2 bg-lightBg dark:bg-white text-purple rounded-full font-semibold"
              onClick={() => addDynamicInput(subtaskInputs, setSubtaskInputs)}
            >
              +Add New Subtask
            </button>
          </div>

          <div>
            <p className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mt-4 mb-2">
              Status
            </p>

            <StatusDropDown
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              availableStatuses={availableStatuses}
              forUpdate={false}
            />

            <button
              type="submit"
              className="block w-full bg-purple text-white py-2 rounded-full mt-2 font-semibold"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
