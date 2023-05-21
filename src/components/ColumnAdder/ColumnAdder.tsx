import React, { useState } from "react";

type Props = {
  setShowColumnForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColumnAdder = ({ setShowColumnForm }: Props) => {
  const [overColumnAdder, setOverColumnAdder] = useState(false);

  return (
    <div
      className="min-w-[90%] mt-[125px] flex items-center justify-center min-h-[75vh] bg-gradient-to-b from-darkTiles to-transparent rounded-lg cursor-pointer"
      onMouseEnter={() => setOverColumnAdder(!overColumnAdder)}
      onMouseLeave={() => setOverColumnAdder(!overColumnAdder)}
      onClick={() => {
        setShowColumnForm(true);
      }}
    >
      <h1
        className={` font-semibold transition-all duration-300 ease-in-out ${
          overColumnAdder ? "text-purple" : "text-subtextColor"
        }`}
      >
        +New Column
      </h1>
    </div>
  );
};

export default ColumnAdder;
