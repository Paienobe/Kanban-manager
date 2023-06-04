import React from "react";
import { ReactComponent as ViewIcon } from "../../assets/icon-show-sidebar.svg";
import { useGlobalContext } from "../../context/globalContext";

const SidebarViewer = () => {
  const { toggleSidebar } = useGlobalContext()!;
  return (
    <div
      className="hidden absolute top-[85%] bottom-[5%] bg-purple hover:bg-indigo-400 rounded-r-full w-[80px] md:flex items-center justify-center cursor-pointer"
      onClick={toggleSidebar}
    >
      <ViewIcon />
    </div>
  );
};

export default SidebarViewer;
