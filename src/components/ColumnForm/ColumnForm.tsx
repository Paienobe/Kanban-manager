import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import uuid from "react-uuid";
import {
  checkInputsForDuplicates,
  deleteDynamicInputs,
  updateInputText,
} from "../../utils/utils";
import { IoClose } from "react-icons/io5";
import { DynamicInput } from "../../types/types";
import DynamicInputField from "../DynamicInputField/DynamicInputField";

type Props = {
  showColumnForm: boolean;
  setShowColumnForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColumnForm = ({ showColumnForm, setShowColumnForm }: Props) => {
  const { currentBoard } = useGlobalContext()!;
  const [columnInputs, setColumnInputs] = useState<DynamicInput[]>([
    { id: uuid(), value: "" },
  ]);
  const [inputsWithDuplicates, setInputWithDuplicates] = useState<
    (string | number)[]
  >([]);

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out p-4 rounded-xl w-[90%] text-left max-h-[90vh] overflow-y-auto">
        <h1 className="text-lightModeTitle dark:text-darkModeTitle text-xl font-semibold mb-4">
          Add New Column
        </h1>

        <form>
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
        </form>
      </div>
    </div>
  );
};

export default ColumnForm;
