import React from "react";
import { ReactComponent as SunIcon } from "../../assets/icon-light-theme.svg";
import { ReactComponent as MoonIcon } from "../../assets/icon-dark-theme.svg";
import { MdCircle } from "react-icons/md";
import { useGlobalContext } from "../../context/globalContext";

const ThemeSwitch = () => {
  const { theme, setTheme } = useGlobalContext()!;
  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <div className="flex items-center justify-between mx-4 my-2 bg-lightBg dark:bg-darkBg py-4 rounded-xl px-14">
      <MoonIcon />
      <div
        className="bg-purple w-16 p-1 rounded-full cursor-pointer"
        onClick={toggleTheme}
      >
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
  );
};

export default ThemeSwitch;
