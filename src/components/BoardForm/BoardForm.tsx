import React, { useRef, useState } from "react";
import uuid from "react-uuid";
import { IoClose } from "react-icons/io5";
import { detectOutsideClick } from "../../utils/utils";

type Props = {
  showBoardForm: boolean;
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardForm = ({ showBoardForm, setShowBoardForm }: Props) => {
  const [columnInputs, setColumnInputs] = useState([{ id: uuid(), value: "" }]);

  const updateInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    input: { id: string; value: string }
  ) => {
    const selectedInput = { ...input, value: e.target.value };
    const updatedInputs = columnInputs.map((item) => {
      if (item.id === input.id) {
        return selectedInput;
      } else return item;
    });

    setColumnInputs(updatedInputs);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  const addNewInput = () => {
    if (columnInputs.length < 6) {
      setColumnInputs([...columnInputs, { id: uuid(), value: "" }]);
    }
    console.log(columnInputs);
  };

  const deleteInput = (id: string) => {
    const updatedInputs = columnInputs.filter((input) => {
      return input.id !== id;
    });
    if (columnInputs.length > 1) {
      setColumnInputs(updatedInputs);
    } else setColumnInputs([{ id: uuid(), value: "" }]);
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
          Add New Board
        </h1>
        <form>
          <div className="">
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
              className="p-2 rounded bg-transparent border border-subtextColor w-full text-lightModeTitle dark:text-darkModeTitle"
            />
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
                return (
                  <div
                    key={uuid()}
                    className="flex items-center justify-between mb-2"
                  >
                    <input
                      type="text"
                      name={`input_${input.id}`}
                      className="p-2 rounded bg-transparent border border-subtextColor w-[90%] box-border text-lightModeTitle dark:text-darkModeTitle"
                      placeholder={placeholderText}
                      defaultValue={input.value}
                      onChange={(e) => {
                        updateInputValue(e, input);
                      }}
                    />
                    <IoClose
                      onClick={() => deleteInput(input.id)}
                      size={30}
                      className="text-subtextColor hover:text-red transition-colors duration-200 ease-in-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="block w-full py-2 bg-lightBg dark:bg-white text-purple rounded-full font-semibold"
              onClick={addNewInput}
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
