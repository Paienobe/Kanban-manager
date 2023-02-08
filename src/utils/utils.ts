import { Subtask } from "../types/types";

export const getCompletedSubtasks = (subtasks: Subtask[]) => {
  const lengthOfSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter((subtasks) => {
    return subtasks.isCompleted === true;
  });
  const lenghtOfCompletedSubtasks = completedSubtasks.length;
  return `${lenghtOfCompletedSubtasks} of ${lengthOfSubtasks} subtask${
    lengthOfSubtasks > 1 ? "s" : ""
  }`;
};
