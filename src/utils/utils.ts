import { Subtask } from "../types/types";

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
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
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
