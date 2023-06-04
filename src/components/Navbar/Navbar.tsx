import React, { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../../context/globalContext";
import mobileLogo from "../../assets/logo-mobile.svg";
import desktopLightLogo from "../../assets/logo-light.svg";
import desktopDarkLogo from "../../assets/logo-dark.svg";
import addIcon from "../../assets/icon-add-task-mobile.svg";
import moreIcon from "../../assets/icon-vertical-ellipsis.svg";
import downIcon from "../../assets/icon-chevron-down.svg";
import { detectOutsideClick } from "../../utils/utils";

type Props = {
  showBoardsModal: boolean;
  setShowBoardsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  showBoardForm: boolean;
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  showBoardsModal,
  setShowBoardsModal,
  setShowTaskForm,
  showBoardForm,
  setShowBoardForm,
}: Props) => {
  const {
    currentBoard,
    setDeleteItem,
    setShowDeleteModal,
    setEditBoard,
    theme,
    isLarge,
    setIsLarge,
  } = useGlobalContext()!;
  const currentBoardName = currentBoard?.name || "No Board Found";
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const desktopLogo = theme === "dark" ? desktopLightLogo : desktopDarkLogo;

  useEffect(() => {
    document.addEventListener("mousedown", (e) =>
      detectOutsideClick(e, optionsRef, showOptions, setShowOptions)
    );
    return () => {
      document.removeEventListener("mousedown", (e) =>
        detectOutsideClick(e, optionsRef, showOptions, setShowOptions)
      );
    };
  }, [showOptions]);

  useEffect(() => {
    if (!showBoardForm) {
      setEditBoard(false);
    }
  }, [showBoardForm]);

  useEffect(() => {
    isLarge ? setShowBoardsModal(true) : setShowBoardsModal(true);
  }, [window.innerWidth]);

  return (
    <div className="p-4 md:px-0 py-6 md:py-0 bg-lightTiles dark:bg-darkTiles flex items-center justify-between fixed top-0 left-0 right-0 border-subtextColor border border-x-0 border-t-0 border-opacity-30 transition-[background] duration-300 ease-in-out">
      <div className="w-[10%] md:hidden">
        <img src={mobileLogo} alt="" />
      </div>

      <div className="hidden md:block w-[40%] border border-transparent border-r-subtextColor border-opacity-30 py-8 px-4">
        <img src={desktopLogo} alt="" />
      </div>

      <div className="w-[70%] md:w-[30%] flex items-center">
        <h1
          className="text-left text-lightModeTitle dark:text-darkModeTitle font-bold text-xl md:text-2xl mr-2"
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
          } md:hidden`}
          alt=""
          onClick={() => {
            setShowBoardsModal(true);
          }}
        />
      </div>

      <div className="w-[20%] md:w-[23%] flex items-center justify-between md:px-4">
        <div
          className="bg-purple p-2 w-[70%] md:hidden rounded-xl flex items-center justify-center"
          onClick={() => setShowTaskForm(true)}
        >
          <img src={addIcon} alt="" />
        </div>

        <button
          className="hidden md:block w-[85%] bg-purple text-white text-sm py-2 rounded-full font-semibold"
          onClick={() => setShowTaskForm(true)}
        >
          +Add New Task
        </button>

        <img
          src={moreIcon}
          alt=""
          className="cursor-pointer"
          onClick={() => setShowOptions(true)}
        />
        {showOptions && (
          <div
            className="absolute bg-lightBg border border-subtextColor border-opacity-25 dark:bg-darkBg top-[4rem] right-4 p-4 rounded-lg text-left w-[50%] md:w-[25%] md:top-[5rem]"
            ref={optionsRef}
          >
            <p
              className="text-subtextColor font-medium pb-2"
              onClick={() => {
                setShowBoardForm(true);
                setEditBoard(true);
                setShowOptions(false);
              }}
            >
              Edit Board
            </p>
            <p
              className="text-red font-medium"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteItem({
                  status: true,
                  id: currentBoard.id,
                  type: "board",
                });
                setShowOptions(false);
              }}
            >
              Delete Board
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
