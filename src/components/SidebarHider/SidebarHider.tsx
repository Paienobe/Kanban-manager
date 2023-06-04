import React, { useState } from "react";
import { ReactComponent as HideIcon } from "../../assets/icon-hide-sidebar.svg";
import { useGlobalContext } from "../../context/globalContext";

const SidebarHider = () => {
  const { toggleSidebar } = useGlobalContext()!;
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="hidden md:flex items-center gap-4 ml-4 mt-4 cursor-pointer w-fit"
      onMouseEnter={() => {
        setHovered(!hovered);
      }}
      onMouseLeave={() => {
        setHovered(!hovered);
      }}
      onClick={toggleSidebar}
    >
      <HideIcon fill={hovered ? "#635fc7" : "#828fa3"} />
      <p
        className={`text-subtextColor font-semibold ${
          hovered ? "text-purple" : ""
        }`}
      >
        Hide Sidebar
      </p>
    </div>
  );
};

export default SidebarHider;
