import React, { useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { detectOutsideClick } from "../../utils/utils";

type Props = {
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal = ({ showDeleteModal, setShowDeleteModal }: Props) => {
  const { currentBoard, appData, setAppData, deleteItem } = useGlobalContext()!;
  const modalRef = useRef<HTMLDivElement | null>(null);

  const deleteCurrentBoard = () => {
    const updatedBoards = appData.boards.filter((board) => {
      return board.id !== currentBoard.id;
    });

    const updatedAppData = { boards: updatedBoards };

    setAppData(updatedAppData);
  };

  const currentColumn = currentBoard.columns.find((column) => {
    return column.tasks.find((task) => {
      return task.id === deleteItem.id;
    });
  });

  const taskToBeDeleted = currentColumn?.tasks.find((task) => {
    return task.id === deleteItem.id;
  });

  const getTitleOrName = () => {
    if (deleteItem.type === "board") {
      return currentBoard.name;
    } else return taskToBeDeleted?.title;
  };

  const deleteTask = () => {
    const updatedTasks = currentColumn?.tasks.filter((task) => {
      return task.id !== taskToBeDeleted?.id;
    });

    const updatedColumn = { ...currentColumn!, tasks: updatedTasks! };

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
        if (board.id === currentBoard.id) {
          return updatedBoard;
        } else return board;
      }),
    };

    setAppData(updatedAppData);
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showDeleteModal, setShowDeleteModal);
      }}
    >
      <div
        className="bg-lightTiles dark:bg-darkTiles p-4 rounded-xl w-[90%] md:w-[65%] lg:w-[45%] lg:max-w-[501px] text-left max-h-[85vh] overflow-y-auto"
        ref={modalRef}
      >
        <h1 className="text-xl font-semibold mb-2 text-red">
          Delete this {deleteItem.type}?
        </h1>
        <p className="text-subtextColor">
          Are you sure you want to delete the ‘{getTitleOrName()}’{" "}
          {deleteItem.type === "board" ? "board" : "task and its subtasks"}?
          This action cannot be reversed.
        </p>
        <div className="mt-4">
          <button
            className="w-full p-2 bg-red text-white rounded-full mb-2 font-medium"
            onClick={() => {
              setShowDeleteModal(false);

              if (deleteItem.type === "board") {
                deleteCurrentBoard();
              } else deleteTask();
            }}
          >
            Delete
          </button>
          <button
            className="w-full p-2 bg-lightBg dark:bg-white text-purple rounded-full font-medium"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
