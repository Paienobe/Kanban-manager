import React from "react";
import { MdCircle } from "react-icons/md";
import { Column } from "../../types/types";
import { columnHexCodes } from "../../constants/constants";

type Props = {
  column: Column;
  index: number;
};

const ColumnHead = ({ column, index }: Props) => {
  return (
    <div className="flex items-center">
      <MdCircle color={columnHexCodes[index]} />
      <p className="text-subtextColor text-left ml-2">
        {column?.name.toUpperCase()} ({column.tasks.length})
      </p>
    </div>
  );
};

export default ColumnHead;
