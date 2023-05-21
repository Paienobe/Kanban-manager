import React from "react";
import { DynamicInput, Subtask } from "../types/types";
import uuid from "react-uuid";

export const getCompletedSubtasks = (subtasks: Subtask[]) => {
  const lengthOfSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((subtasks) => {
    return subtasks.isCompleted === true;
  });
  const lenghtOfCompletedSubtasks = completedSubtasks.length;
  const results = {
    completed: lenghtOfCompletedSubtasks,
    total: lengthOfSubtasks,
  };
  return results;
};

export const detectOutsideClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent,
  elementRef: React.MutableRefObject<HTMLDivElement | null>,
  visibilityState: boolean,
  setVisibilityState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (elementRef && visibilityState) {
    if (
      elementRef.current &&
      !elementRef.current.contains(e?.target as Element)
    ) {
      setVisibilityState(false);
    }
  }
};

export const checkInputsForDuplicates = (
  e: React.ChangeEvent<HTMLInputElement>,
  id: string | number,
  inputsArray: DynamicInput[],
  duplicateIdsArray: (string | number)[],
  idsArraySetter: React.Dispatch<React.SetStateAction<(string | number)[]>>
) => {
  const duplicatesExist = inputsArray.some((obj) => {
    return (
      obj.id !== id &&
      obj.value.toLowerCase() &&
      obj.value.toLowerCase() === e.target.value.trim().toLowerCase()
    );
  });

  if (duplicatesExist) {
    idsArraySetter([...duplicateIdsArray, id]);
  } else {
    const updatedIds = duplicateIdsArray.filter((item) => {
      return item !== id;
    });
    idsArraySetter(updatedIds);
  }
};

export const updateInputText = (
  e: React.ChangeEvent<HTMLInputElement>,
  input: DynamicInput,
  inputsArray: DynamicInput[],
  inputsSetter: React.Dispatch<React.SetStateAction<DynamicInput[]>>
) => {
  const selectedInput = { ...input, value: e.target.value };
  const updatedInputs = inputsArray.map((item) => {
    if (item.id === input.id) {
      return selectedInput;
    } else return item;
  });
  inputsSetter(updatedInputs);
};

export const deleteDynamicInputs = (
  id: string | number,
  inputsArray: DynamicInput[],
  inputsArraySetter: React.Dispatch<React.SetStateAction<DynamicInput[]>>
) => {
  const updatedInputs = inputsArray.filter((input) => {
    return input.id !== id;
  });
  if (inputsArray.length > 1) {
    inputsArraySetter(updatedInputs);
  } else inputsArraySetter([{ id: uuid(), value: "" }]);
};

export const addDynamicInput = (
  inputsArray: DynamicInput[],
  inputsArraySetter: React.Dispatch<React.SetStateAction<DynamicInput[]>>
) => {
  inputsArraySetter([...inputsArray, { id: uuid(), value: "" }]);
};
