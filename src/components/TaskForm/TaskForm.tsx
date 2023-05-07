import React, { useRef, useState } from "react";
import {
  addDynamicInput,
  checkInputsForDuplicates,
  deleteDynamicInputs,
  detectOutsideClick,
  updateInputText,
} from "../../utils/utils";
import uuid from "react-uuid";
import { IoClose } from "react-icons/io5";
import downIcon from "../../assets/icon-chevron-down.svg";
import { useGlobalContext } from "../../context/globalContext";

type Props = {
  showTaskForm: boolean;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskForm = ({ showTaskForm, setShowTaskForm }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { currentBoard } = useGlobalContext()!;

  const [subtaskInputs, setSubtaskInputs] = useState([
    { id: uuid(), value: "" },
  ]);
  const [inputsWithDuplicates, setInputWithDuplicates] = useState<string[]>([]);

  const availableStatuses = currentBoard.columns.map((column) => {
    return column.name;
  });

  const [selectedStatus, setSelectedStatus] = useState(availableStatuses[0]);
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
          Add New Task
        </h1>

        <form ref={formRef}>
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
                <div
                  key={input.id}
                  className="flex items-center justify-between mb-2"
                >
                  <input
                    type="text"
                    name={`input_${input.id}`}
                    className={`p-2 rounded bg-transparent border  w-[90%] box-border text-lightModeTitle dark:text-darkModeTitle outline-none relative ${
                      !true ? "border-red" : "border-subtextColor"
                    }`}
                    placeholder={placeholderText}
                    required
                    value={input.value}
                    onChange={(e) => {
                      checkInputsForDuplicates(
                        e,
                        input.id,
                        subtaskInputs,
                        inputsWithDuplicates,
                        setInputWithDuplicates
                      );

                      updateInputText(
                        e,
                        input,
                        subtaskInputs,
                        setSubtaskInputs
                      );
                    }}
                  />
                  <IoClose
                    onClick={() =>
                      deleteDynamicInputs(
                        input.id,
                        subtaskInputs,
                        setSubtaskInputs
                      )
                    }
                    size={30}
                    className="text-subtextColor hover:text-red transition-colors duration-200 ease-in-out"
                  />
                  {hasADuplicateValue && (
                    <p className="absolute right-[20%] font-semibold text-red">
                      Used
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="block w-full py-2 bg-lightBg dark:bg-white text-purple rounded-full font-semibold"
              onClick={() => addDynamicInput(subtaskInputs, setSubtaskInputs)}
            >
              +Add New Task
            </button>
          </div>

          <div>
            <p className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mt-4 mb-2">
              Status
            </p>
            <div
              className="border border-purple px-2 py-3 rounded-md my-2 flex items-center justify-between"
              onClick={() => {
                setShowStatuses(!showStatuses);
              }}
            >
              <p className="text-lightModeTitle dark:text-darkModeTitle text-sm">
                {selectedStatus}
              </p>
              <img src={downIcon} alt="" />
            </div>

            <div
              className={`bg-lightBg dark:bg-darkBg px-2 ${
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
                      setSelectedStatus(status);
                      setShowStatuses(!showStatuses);
                    }}
                  >
                    {status}
                  </p>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
