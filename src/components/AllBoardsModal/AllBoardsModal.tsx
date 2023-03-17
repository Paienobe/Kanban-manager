import React, { useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import boardIcon from "../../assets/icon-board.svg";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";
import { ReactComponent as SunIcon } from "../../assets/icon-light-theme.svg";
import { ReactComponent as MoonIcon } from "../../assets/icon-dark-theme.svg";
import { detectOutsideClick } from "../../utils/utils";
import { MdCircle } from "react-icons/md";

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
  const { appData, currentBoardIndex, setCurrentBoardIndex, theme, setTheme } =
    useGlobalContext()!;
  const totalBoards = appData.boards.length;
  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) =>
        detectOutsideClick(e, modalRef, showBoardsModal, setShowBoardsModal)
      }
    >
      <div
        className="bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out py-4 rounded-xl w-[90%] text-left"
        ref={modalRef}
      >
        <p className="text-subtextColor font-semibold text-lg pl-4 mb-2">
          ALL BOARDS ({totalBoards})
        </p>

        <div>
          {appData.boards.map((board, index) => {
            return (
              <div
                key={board.id}
                className={`flex items-center ${
                  currentBoardIndex === index ? "bg-purple" : "bg-transparent"
                } w-[95%] pl-4 py-3 rounded-tr-full rounded-br-full`}
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
                    currentBoardIndex === index
                      ? "text-white"
                      : "text-subtextColor"
                  }`}
                >
                  {board.name}
                </p>
              </div>
            );
          })}

          <div
            className="flex items-center ml-4 my-2"
            onClick={() => setShowBoardForm(true)}
          >
            <BoardIcon className="mr-4  my-3" fill="#635fc7" />
            <p className="text-purple">+Create New Board</p>
          </div>
        </div>

        <div
          className="flex items-center justify-between mx-4 my-2 bg-lightBg dark:bg-darkBg py-4 rounded-xl px-14"
          onClick={toggleTheme}
        >
          <MoonIcon />
          <div className="bg-purple w-16 p-1 rounded-full">
            <MdCircle
              size={20}
              color="white"
              className={`${
                theme === "dark" ? "mr-[50%]" : "ml-[65%]"
              } transition-all duration-300 ease-in-out`}
            />
          </div>
          <SunIcon />
        </div>
      </div>
    </div>
  );
};

export default AllBoardsModal;
