import React from "react";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";
import { useGlobalContext } from "../../context/globalContext";
import { Board } from "../../types/types";

type Props = {
  board: Board;
  index: number;
  setShowBoardsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const BoardListItem = ({ board, index, setShowBoardsModal }: Props) => {
  const { currentBoardIndex, setCurrentBoardIndex } = useGlobalContext()!;
  return (
    <div
      className={`flex items-center ${
        currentBoardIndex === index
          ? "bg-purple"
          : "bg-transparent hover:bg-purple hover:bg-opacity-20"
      } w-[95%] pl-4 py-3 rounded-tr-full rounded-br-full cursor-pointer`}
      onClick={() => {
        setCurrentBoardIndex(index);
        setShowBoardsModal(false);
      }}
    >
      <BoardIcon
        style={{ marginRight: "1rem" }}
        fill={currentBoardIndex === index ? "white" : "#828fa3"}
      />
      <p
        className={`${
          currentBoardIndex === index ? "text-white" : "text-subtextColor"
        }`}
      >
        {board.name}
      </p>
    </div>
  );
};

export default BoardListItem;
