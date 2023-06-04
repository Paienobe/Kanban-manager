import React from "react";
import {
  AppDataType,
  Board,
  Column,
  DynamicInput,
  SelectedTask,
  Subtask,
  Task,
} from "../types/types";
import uuid from "react-uuid";
import { DraggableLocation } from "@hello-pangea/dnd";
import data from "../data/data.json";

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

export const getCurrentColumn = (
  currentBoard: Board,
  selectedTask: SelectedTask
) => {
  return currentBoard.columns.find((column) => {
    return column.tasks.find((task) => {
      return task.id === selectedTask!.id;
    });
  });
};

export const getViewedTask = (
  currentColumn: Column,
  selectedTask: SelectedTask
) => {
  return currentColumn?.tasks.find((task) => {
    return task.id === selectedTask.id;
  });
};

export const getEditedTaskSubtaskStatus = (task: Task, id: string | number) => {
  const requiredSubtask = task.subtasks.find((subtask) => {
    return subtask.id === id;
  });

  if (requiredSubtask) {
    return requiredSubtask.isCompleted;
  } else return false;
};

export const updateDragAndDropInSameColumn = (
  startColumn: Column | undefined,
  movedTask: Task | undefined,
  destination: DraggableLocation,
  currentBoard: Board,
  appData: AppDataType
) => {
  let alteredTasks = startColumn?.tasks.filter((task) => {
    return task.id !== movedTask?.id;
  });

  alteredTasks!.splice(destination.index, 0, movedTask!);

  const updatedColumn = { ...startColumn!, tasks: alteredTasks! };

  const updatedBoard = {
    ...currentBoard,
    columns: currentBoard.columns.map((column) => {
      if (column.id === updatedColumn.id) {
        return updatedColumn;
      } else return column;
    }),
  };

  const updatedAppData = {
    boards: appData.boards.map((board) => {
      if (board.id === updatedBoard.id) {
        return updatedBoard;
      } else return board;
    }),
  };

  return updatedAppData;
};

export const updateDragAndDropAcrossColumns = (
  startColumn: Column | undefined,
  endColumn: Column | undefined,
  movedTask: Task | undefined,
  destination: DraggableLocation,
  currentBoard: Board,
  appData: AppDataType
) => {
  const updatedStartColumnTasks = startColumn?.tasks.filter((task) => {
    return task.id !== movedTask?.id;
  });

  let alteredEndColumnTasks = endColumn?.tasks;
  alteredEndColumnTasks!.splice(destination.index, 0, movedTask!);

  const updatedStartColumn = {
    ...startColumn!,
    tasks: updatedStartColumnTasks!,
  };

  const updatedEndColumn = { ...endColumn!, tasks: alteredEndColumnTasks! };

  const updatedBoard = {
    ...currentBoard,
    columns: currentBoard.columns.map((column) => {
      if (column.id === startColumn?.id) {
        return updatedStartColumn;
      } else if (column.id === endColumn?.id) {
        return updatedEndColumn;
      } else return column;
    }),
  };

  const updatedAppData = {
    boards: appData.boards.map((board) => {
      if (board.id === updatedBoard.id) {
        return updatedBoard;
      } else return board;
    }),
  };

  return updatedAppData;
};

export const getPreservedAppData = () => {
  let localData = localStorage.getItem("kanban_data");
  if (localData) {
    const kanbanData: AppDataType = JSON.parse(localData);
    return kanbanData;
  } else return data;
};

export const getPreservedBoardIndex = () => {
  let localData = localStorage.getItem("kanban_board_index");
  if (localData) {
    const index: number = JSON.parse(localData);
    return index;
  } else return 0;
};
