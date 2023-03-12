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

  const getTitleOrName = () => {
    if (deleteItem.type === "board") {
      return currentBoard.name;
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={(e) => {
        detectOutsideClick(e, modalRef, showDeleteModal, setShowDeleteModal);
      }}
    >
      <div
        className="bg-lightTiles dark:bg-darkTiles p-4 rounded-xl w-[90%] text-left max-h-[85vh] overflow-y-auto"
        ref={modalRef}
      >
        <h1 className="text-xl font-semibold mb-2 text-red">
          Delete this {deleteItem.type}?
        </h1>
        <p className="text-subtextColor">
          Are you sure you want to delete the ‘{getTitleOrName()}’ board? This
          action cannot be reversed.
        </p>
        <div className="mt-4">
          <button
            className="w-full p-2 bg-red text-white rounded-full mb-2 font-medium"
            onClick={() => {
              deleteCurrentBoard();
              setShowDeleteModal(false);
            }}
          >
            Delete
          </button>
          <button className="w-full p-2 bg-white text-purple rounded-full font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
