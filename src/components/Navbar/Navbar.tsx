import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import mobileLogo from "../../assets/logo-mobile.svg";
import addIcon from "../../assets/icon-add-task-mobile.svg";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import downIcon from "../../assets/icon-chevron-down.svg";

type Props = {
  showBoardsModal: boolean;
  setShowBoardsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ showBoardsModal, setShowBoardsModal }: Props) => {
  const { currentBoard } = useGlobalContext()!;
  const currentBoardName = currentBoard.name;

  return (
    <div className="p-4 py-6 bg-lightTiles dark:bg-darkTiles flex items-center justify-between fixed top-0 left-0 right-0 border-subtextColor border border-x-0 border-t-0 border-opacity-30 transition-[background] duration-300 ease-in-out">
      <div className="w-[10%]">
        <img src={mobileLogo} alt="" />
      </div>

      <div className="w-[70%] flex items-center">
        <h1
          className="text-left text-lightModeTitle dark:text-darkModeTitle font-bold text-xl mr-2"
          onClick={() => {
            setShowBoardsModal(true);
          }}
        >
          {currentBoardName}
        </h1>
        <img
          src={downIcon}
          className={`transition-all duration-300 ${
            showBoardsModal && "rotate-180"
          }`}
          alt=""
          onClick={() => {
            setShowBoardsModal(true);
          }}
        />
      </div>

      <div className="w-[20%] flex items-center justify-between">
        <div className="bg-purple p-2 w-[70%] rounded-xl flex items-center justify-center">
          <img src={addIcon} alt="" />
        </div>
        <img src={moreIcon} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
