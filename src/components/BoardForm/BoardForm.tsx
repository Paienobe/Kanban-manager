import React, { useState } from "react";
import uuid from "react-uuid";
import { IoClose } from "react-icons/io5";

const BoardForm = () => {
  const [columnInputs, setColumnInputs] = useState([{ id: uuid(), value: "" }]);
  const updateInputValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedInput = columnInputs.find((input) => {
      return input.id === id;
    });
    const updateSelectedInput = { ...selectedInput!, value: e.target.value };
    const updatedInputs = columnInputs.map((input) => {
      if (input.id === id) {
        return updateSelectedInput;
      } else return input;
    });
    setColumnInputs(updatedInputs);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out p-4 rounded-xl w-[90%] text-left">
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
                    className="flex items-center justify-between"
                  >
                    <input
                      type="text"
                      className="p-2 rounded bg-transparent border border-subtextColor w-[90%] box-border text-lightModeTitle dark:text-darkModeTitle"
                      placeholder={placeholderText}
                      value={input.value}
                      onChange={(e) => {
                        updateInputValue(e, input.id);
                      }}
                    />
                    <IoClose
                      size={30}
                      className="text-subtextColor hover:text-red transition-colors duration-200 ease-in-out"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;
