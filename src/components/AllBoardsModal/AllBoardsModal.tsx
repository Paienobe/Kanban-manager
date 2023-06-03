import React, { useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";
import { detectOutsideClick } from "../../utils/utils";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import BoardListItem from "../BoardListItem/BoardListItem";

type Props = {
  showBoardsModal: boolean;
  setShowBoardsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AllBoardsModal = ({
  showBoardsModal,
  setShowBoardsModal,
  setShowBoardForm,
}: Props) => {
  const { appData, currentBoardIndex, setCurrentBoardIndex } =
    useGlobalContext()!;
  const totalBoards = appData.boards.length;
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="fixed md:static md:max-h-[100vh] md:min-w-[40%] top-0 bottom-0 left-0 right-0 flex items-center justify-center md:items-start md:pt-[100px] bg-black bg-opacity-50 md:bg-white md:dark:bg-darkTiles border border-transparent md:border-r-subtextColor md:border-opacity-30"
      onClick={(e) =>
        detectOutsideClick(e, modalRef, showBoardsModal, setShowBoardsModal)
      }
    >
      <div
        className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out py-4 rounded-xl md:rounded-none w-[90%] md:w-full text-left md:h-[100%] md:flex md:flex-col md:justify-between"
        ref={modalRef}
      >
        <div>
          <p className="text-subtextColor font-semibold text-lg pl-4 mb-2">
            ALL BOARDS ({totalBoards})
          </p>

          <div>
            {appData.boards.map((board, index) => {
              return (
                <BoardListItem
                  key={board.id}
                  board={board}
                  index={index}
                  setShowBoardsModal={setShowBoardsModal}
                />
              );
            })}

            <div
              className="flex items-center ml-4 my-2 cursor-pointer"
              onClick={() => {
                setShowBoardsModal(false);
                setShowBoardForm(true);
              }}
            >
              <BoardIcon className="mr-4  my-3" fill="#635fc7" />
              <p className="text-purple md:font-semibold md:hover:scale-105">
                +Create New Board
              </p>
            </div>
          </div>
        </div>

        <ThemeSwitch />
      </div>
    </div>
  );
};

export default AllBoardsModal;
