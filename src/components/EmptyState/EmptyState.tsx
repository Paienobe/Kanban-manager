import React from "react";

type Props = {
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmptyState = ({ setShowBoardForm }: Props) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p className="text-subtextColor text-lg font-medium">
        There are no boards. Create a new board to get started.
      </p>
      <button
        className="bg-purple text-white p-2 rounded-full mt-4 w-[60%] font-medium"
        onClick={() => setShowBoardForm(true)}
      >
        +Create New Board
      </button>
    </div>
  );
};

export default EmptyState;
