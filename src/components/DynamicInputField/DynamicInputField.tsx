import React from "react";
import { DynamicInput } from "../../types/types";
import {
  checkInputsForDuplicates,
  deleteDynamicInputs,
  updateInputText,
} from "../../utils/utils";
import { IoClose } from "react-icons/io5";

type Props = {
  input: DynamicInput;
  hasADuplicateValue: boolean;
  placeholderText: string;
  columnInputs: DynamicInput[];
  setColumnInputs: React.Dispatch<React.SetStateAction<DynamicInput[]>>;
  inputsWithDuplicates: (string | number)[];
  setInputWithDuplicates: React.Dispatch<
    React.SetStateAction<(string | number)[]>
  >;
  fixedItems?: DynamicInput[];
};

const DynamicInputField = ({
  input,
  hasADuplicateValue,
  columnInputs,
  placeholderText,
  setColumnInputs,
  inputsWithDuplicates,
  setInputWithDuplicates,
  fixedItems,
}: Props) => {
  const itemIsFixed = fixedItems?.some((item) => {
    return item.id === input.id;
  });

  return (
    <div className="flex items-center justify-between mb-2">
      <input
        type="text"
        name={`input_${input.id}`}
        className={`p-2 rounded bg-transparent border  w-[90%] box-border text-lightModeTitle dark:text-darkModeTitle outline-none relative ${
          hasADuplicateValue ? "border-red" : "border-subtextColor"
        }`}
        placeholder={placeholderText}
        readOnly={itemIsFixed}
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
          updateInputText(e, input, columnInputs, setColumnInputs);
        }}
      />
      <IoClose
        onClick={() =>
          !itemIsFixed &&
          deleteDynamicInputs(input.id, columnInputs, setColumnInputs)
        }
        size={30}
        className={`text-subtextColor hover:text-red cursor-pointer transition-colors duration-200 ease-in-out ${
          itemIsFixed ? "opacity-20" : ""
        }`}
      />
      {hasADuplicateValue && (
        <p className="absolute right-[20%] font-semibold text-red">Used</p>
      )}
    </div>
  );
};

export default DynamicInputField;
