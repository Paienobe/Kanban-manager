import React, { useRef, useState } from "react";
import { detectOutsideClick } from "../../utils/utils";
import uuid from "react-uuid";
import { IoClose } from "react-icons/io5";

type Props = {
  showTaskForm: boolean;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskForm = ({ showTaskForm, setShowTaskForm }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [subtaskInputs, setSubtaskInputs] = useState([
    { id: uuid(), value: "" },
  ]);

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

        <form>
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
              //   onChange={(e) => {
              //     checkForDuplicateBoardName(e.target.value);
              //   }}
            />
            {/* {boardNameIsUsed && (
              <p className="absolute top-[55%] right-[2.5%] font-semibold text-red">
                Used
              </p>
            )} */}
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
                  : "Your suntask title...";
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
                    // onChange={(e) => {
                    //   checkForDuplicates(e, input.id);
                    //   updateInputValue(e, input);
                    // }}
                  />
                  <IoClose
                    // onClick={() => deleteInput(input.id)}
                    size={30}
                    className="text-subtextColor hover:text-red transition-colors duration-200 ease-in-out"
                  />
                  {/* {hasADuplicateValue && (
                    <p className="absolute right-[20%] font-semibold text-red">
                      Used
                    </p>
                  )} */}
                </div>
              );
            })}
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="block w-full py-2 bg-lightBg dark:bg-white text-purple rounded-full font-semibold"
              //   onClick={addNewInput}
            >
              +Add New Column
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
