import React, { useRef, useState } from "react";
import uuid from "react-uuid";
import { addDynamicInput, detectOutsideClick } from "../../utils/utils";
import { Board, DynamicInput } from "../../types/types";
import { useGlobalContext } from "../../context/globalContext";
import DynamicInputField from "../DynamicInputField/DynamicInputField";

type Props = {
  showBoardForm: boolean;
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardForm = ({ showBoardForm, setShowBoardForm }: Props) => {
  const { appData, setAppData, setCurrentBoardIndex, editBoard, currentBoard } =
    useGlobalContext()!;

  const editableColumns = currentBoard?.columns.map((column) => {
    return { id: column.id, value: column.name };
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

  const editCurrentBoard = () => {
    if (!boardNameIsUsed && inputsWithDuplicates.length < 1) {
      if (formRef.current) {
        const boardName = formRef.current.board_name.value;
        const boardColumns = columnInputs.map((obj) => {
          const currentColumn = currentBoard.columns.find((column) => {
            return column.id === obj.id;
          });
          if (currentColumn) {
            return {
              id: currentColumn.id,
              name: formRef.current?.[`input_${obj.id}`].value,
              tasks: currentColumn.tasks,
            };
          } else {
            return {
              id: obj.id,
              name: formRef.current?.[`input_${obj.id}`].value,
              tasks: [],
            };
          }
        });

        const updatedBoard: Board = {
          id: currentBoard.id,
          name: boardName,
          columns: boardColumns,
        };

        const updatedAppData = {
          boards: appData.boards.map((board) => {
            if (board.id === currentBoard.id) {
              return updatedBoard;
            } else return board;
          }),
        };

        setAppData(updatedAppData);
        setShowBoardForm(false);
      }
    }
  };

  const checkForDuplicateBoardName = (name: string) => {
    const duplicateIsPresent = appData.boards.some((board) => {
      return (
        board.name.toLowerCase() === name.trim().toLowerCase() &&
        board.name.toLowerCase() !== currentBoard.name.toLowerCase()
      );
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
        className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out p-4 rounded-xl w-[90%] md:w-[65%] text-left max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-lightModeTitle dark:text-darkModeTitle text-xl font-semibold mb-4">
          {!editBoard ? "Add New Board" : "Edit Board"}
        </h1>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            !editBoard ? createBoard() : editCurrentBoard();
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
            {boardNameIsUsed && (
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
                  <DynamicInputField
                    key={input.id}
                    input={input}
                    hasADuplicateValue={hasADuplicateValue}
                    columnInputs={columnInputs}
                    setColumnInputs={setColumnInputs}
                    placeholderText={placeholderText}
                    inputsWithDuplicates={inputsWithDuplicates}
                    setInputWithDuplicates={setInputWithDuplicates}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className={`block w-full py-2 bg-lightBg dark:bg-white text-purple rounded-full font-semibold ${
                columnInputs.length < 6
                  ? "opacity-100"
                  : "opacity-30 cursor-not-allowed"
              }`}
              onClick={() => {
                if (columnInputs.length < 6) {
                  addDynamicInput(columnInputs, setColumnInputs);
                }
              }}
            >
              +Add New Column
            </button>
            <button
              type="submit"
              className="block w-full bg-purple text-white py-2 rounded-full mt-2 font-semibold"
            >
              {!editBoard ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
