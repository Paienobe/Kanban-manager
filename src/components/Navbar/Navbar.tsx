import React, { useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import mobileLogo from "../../assets/logo-mobile.svg";
import addIcon from "../../assets/icon-add-task-mobile.svg";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import downIcon from "../../assets/icon-chevron-down.svg";

const Navbar = () => {
  const { appData, currentBoardIndex, currentBoard } = useGlobalContext()!;
  const currentBoardName = currentBoard.name;

  return (
    <div className="p-4 py-6 bg-darkTiles flex items-center justify-between">
      <div className="w-[10%]">
        <img src={mobileLogo} alt="" />
      </div>

      <div className="w-[70%] flex items-center">
        <h1 className="text-left text-darkModeTitle font-bold text-xl mr-2">
          {currentBoardName}
        </h1>
        <img src={downIcon} alt="" />
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
