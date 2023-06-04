import React, { useRef, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";
import { detectOutsideClick } from "../../utils/utils";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import BoardListItem from "../BoardListItem/BoardListItem";
import { ReactComponent as HideIcon } from "../../assets/icon-hide-sidebar.svg";
import showIcon from "../../assets/icon-hide-sidebar.svg";
import SidebarHider from "../SidebarHider/SidebarHider";

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
  const { appData, isLarge, hideSidebar } = useGlobalContext()!;
  const totalBoards = appData.boards.length;
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={`fixed ${
        hideSidebar ? "md:static hide_sidebar" : "md:static show_sidebar"
      }  md:max-h-[100%] md:min-h-[100%] md:mt-auto mggggd:min-w-[40%] md:min-w-[320px] md:max-w-[320px] top-0 bottom-0 left-0 right-0 flex items-center justify-center md:items-start md:pt-0 bg-black bg-opacity-50 md:bg-white md:dark:bg-darkTiles border border-transparent md:border-r-subtextColor md:border-opacity-30 box-border`}
      onClick={(e) =>
        detectOutsideClick(e, modalRef, showBoardsModal, setShowBoardsModal)
      }
    >
      <div
        className={`bg-lightTiles dark:bg-darkTiles transition-[background] duration-300 ease-in-out py-4 rounded-xl md:rounded-none w-[90%] md:w-full box-border text-left max-h-[90vh] md:min-h-[calc(100vh-92px)] md:max-h-[calc(100vh-92px)] md:flex md:flex-col md:justify-between ${
          hideSidebar ? "hidden md:w-0" : ""
        }`}
        ref={modalRef}
      >
        <div>
          <p className="text-subtextColor font-semibold text-lg pl-4 mb-2">
            ALL BOARDS ({totalBoards})
          </p>

          <div>
            <div className="max-h-[calc(90vh-254px)] md:max-h-[calc(93vh-254px)] lg:max-h-[calc(90vh-265px)] overflow-y-auto">
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
            </div>

            <div
              className="flex items-center ml-4 my-2 cursor-pointer md:hover:opacity-50"
              onClick={() => {
                !isLarge && setShowBoardsModal(false);
                setShowBoardForm(true);
              }}
            >
              <BoardIcon className="mr-4  my-3" fill="#635fc7" />
              <p className="text-purple md:font-semibold">+Create New Board</p>
            </div>
          </div>
        </div>

        <div>
          <ThemeSwitch />

          <SidebarHider />
        </div>
      </div>
    </div>
  );
};

export default AllBoardsModal;
