import React, { useState, useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import uuid from "react-uuid";
import { addDynamicInput, detectOutsideClick } from "../../utils/utils";
import { DynamicInput } from "../../types/types";
import DynamicInputField from "../DynamicInputField/DynamicInputField";

type Props = {
  showColumnForm: boolean;
  setShowColumnForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColumnForm = ({ showColumnForm, setShowColumnForm }: Props) => {
  const { currentBoard, appData, setAppData } = useGlobalContext()!;
  const currentColumnNames: DynamicInput[] = currentBoard.columns.map(
    (column) => {
      return { id: column.id, value: column.name };
    }
  );
  const [columnInputs, setColumnInputs] =
    useState<DynamicInput[]>(currentColumnNames);
  const [inputsWithDuplicates, setInputWithDuplicates] = useState<
    (string | number)[]
  >([]);

  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const addColumns = () => {
    const newColumnNames = columnInputs.filter((column) => {
      return !currentColumnNames.some((item) => {
        return item.id === column.id;
      });
    });

    const newColumns = newColumnNames.map((item) => {
      return { id: item.id, name: item.value, tasks: [] };
    });

    const updatedBoard = {
      ...currentBoard,
      columns: [...currentBoard.columns, ...newColumns],
    };

    const updatedAppData = {
      boards: appData.boards.map((board) => {
        if (board.id === currentBoard.id) {
          return updatedBoard;
        } else return board;
      }),
    };

    setAppData(updatedAppData);
    setShowColumnForm(false);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showColumnForm, setShowColumnForm);
      }}
    >
      <div
        ref={modalRef}
        className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out p-4 rounded-xl w-[90%] text-left max-h-[90vh] overflow-y-auto"
      >
        <h1 className="text-lightModeTitle dark:text-darkModeTitle text-xl font-semibold mb-4">
          Add New Column
        </h1>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            addColumns();
          }}
        >
          <label
            htmlFor="board name"
            className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="board_name"
            required
            value={currentBoard.name}
            readOnly={true}
            className={`p-2 rounded bg-transparent border w-full text-lightModeTitle dark:text-darkModeTitle opacity-30 outline-none`}
          />

          <div>
            <label
              htmlFor="board columns"
              className="block text-lightModeTitle dark:text-darkModeTitle font-semibold mt-4 mb-2"
            >
              Board Columns
            </label>
            <div>
              {columnInputs.map((input, index) => {
                const placeholderText = "Your column title...";

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
                    fixedItems={currentColumnNames}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColumnForm;
