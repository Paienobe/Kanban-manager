import React, { useCallback, useRef, useState } from "react";
import uuid from "react-uuid";
import { IoClose } from "react-icons/io5";
import {
  addDynamicInput,
  checkInputsForDuplicates,
  deleteDynamicInputs,
  detectOutsideClick,
  updateInputText,
} from "../../utils/utils";
import { Board, DynamicInput } from "../../types/types";
import { useGlobalContext } from "../../context/globalContext";

type Props = {
  showBoardForm: boolean;
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardForm = ({ showBoardForm, setShowBoardForm }: Props) => {
  const { appData, setAppData, setCurrentBoardIndex, editBoard, currentBoard } =
    useGlobalContext()!;

  const editableColumns = currentBoard.columns.map((column) => {
    return { id: String(column.id), value: column.name };
  });

  const defaultColumns = [
    { id: uuid(), value: "" },
    { id: uuid(), value: "" },
  ];

  const [inputsWithDuplicates, setInputWithDuplicates] = useState<
    (string | number)[]
  >([]);
  const [boardNameIsUsed, setBoardNameIsUsed] = useState(false);
  const [columnInputs, setColumnInputs] = useState<DynamicInput[]>(
    !editBoard ? defaultColumns : editableColumns
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const createBoard = () => {
    if (!boardNameIsUsed && inputsWithDuplicates.length < 1) {
      if (formRef.current) {
        const boardName = formRef.current.board_name.value;
        const boardColumns = columnInputs.map((obj) => {
          return {
            id: uuid(),
            name: formRef.current?.[`input_${obj.id}`].value,
            tasks: [],
          };
        });
        const newBoard: Board = {
          id: uuid(),
          name: boardName,
          columns: boardColumns,
        };
        const updatedAppData = { boards: [...appData.boards, newBoard] };
        setAppData(updatedAppData);
        setCurrentBoardIndex(appData.boards.length);
        setShowBoardForm(false);
      }
    }
  };

  const checkForDuplicateBoardName = (name: string) => {
    const duplicateIsPresent = appData.boards.some((board) => {
      return board.name.toLowerCase() === name.trim().toLowerCase();
    });
    setBoardNameIsUsed(duplicateIsPresent);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showBoardForm, setShowBoardForm);
      }}
    >
      <div
        ref={modalRef}
        className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out p-4 rounded-xl w-[90%] text-left max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-lightModeTitle dark:text-darkModeTitle text-xl font-semibold mb-4">
          {!editBoard ? "Add New Board" : "Edit Board"}
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            createBoard();
          }}
        >
          <div className="relative">
            <label
              htmlFor="board name"
              className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mb-2"
            >
              Board Name
            </label>
            <input
              type="text"
              name="board_name"
              placeholder="e.g. Web Designer"
              required
              className={`p-2 rounded bg-transparent border w-full text-lightModeTitle dark:text-darkModeTitle outline-none ${
                boardNameIsUsed && !editBoard
                  ? "border-red"
                  : "border-subtextColor"
              }`}
              defaultValue={!editBoard ? "" : currentBoard.name}
              onChange={(e) => {
                checkForDuplicateBoardName(e.target.value);
              }}
            />
            {boardNameIsUsed && !editBoard && (
              <p className="absolute top-[55%] right-[2.5%] font-semibold text-red">
                Used
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="board columns"
              className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mt-4 mb-2"
            >
              Board Columns
            </label>
            <div>
              {columnInputs.map((input, index) => {
                const placeholderText =
                  index === 0
                    ? "e.g. Todo"
                    : index === 1
                    ? "e.g. Doing"
                    : index === 2
                    ? "e.g. Done"
                    : "Your column title...";

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
                        hasADuplicateValue
                          ? "border-red"
                          : "border-subtextColor"
                      }`}
                      placeholder={placeholderText}
                      required
                      value={input.value}
                      onChange={(e) => {
                        checkInputsForDuplicates(
                          e,
                          input.id,
                          columnInputs,
                          inputsWithDuplicates,
                          setInputWithDuplicates
                        );
                        updateInputText(
                          e,
                          input,
                          columnInputs,
                          setColumnInputs
                        );
                      }}
                    />
                    <IoClose
                      onClick={() =>
                        deleteDynamicInputs(
                          input.id,
                          columnInputs,
                          setColumnInputs
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
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="block w-full py-2 bg-lightBg dark:bg-white text-purple rounded-full font-semibold"
              onClick={() => addDynamicInput(columnInputs, setColumnInputs)}
            >
              +Add New Column
            </button>
            <button
              type="submit"
              className="block w-full bg-purple text-white py-2 rounded-full mt-2 font-semibold"
            >
              Create New Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
