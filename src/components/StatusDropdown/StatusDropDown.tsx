import React, { useState } from "react";
import uuid from "react-uuid";
import downIcon from "../../assets/icon-chevron-down.svg";

type Props = {
  selectedStatus: string;
  setSelectedStatus?: React.Dispatch<React.SetStateAction<string>>;
  availableStatuses: string[];
  updateTaskColumn?: (status: string) => void;
  forUpdate: boolean;
};

const StatusDropDown = ({
  selectedStatus,
  setSelectedStatus,
  availableStatuses,
  updateTaskColumn,
  forUpdate,
}: Props) => {
  const [showStatuses, setShowStatuses] = useState(false);
  return (
    <div>
      <div
        className="border border-purple px-2 py-3 rounded-md my-2 flex items-center justify-between"
        onClick={() => {
          setShowStatuses(!showStatuses);
        }}
      >
        <p className="text-lightModeTitle dark:text-darkModeTitle text-sm">
          {selectedStatus}
        </p>
        <img src={downIcon} alt="" />
      </div>

      <div
        className={`bg-lightBg dark:bg-darkBg px-2 ${
          showStatuses ? "py-3" : "py-0"
        } rounded-md overflow-hidden ${
          showStatuses
            ? "max-h-[1000px] transition-[max-height] duration-300 ease-in"
            : "max-h-[0px] transition-[max-height] duration-300 ease-smooth"
        }`}
      >
        {availableStatuses.map((status) => {
          return (
            <p
              key={uuid()}
              className={`text-subtextColor pb-2 text-sm`}
              onClick={() => {
                if (!forUpdate) {
                  setSelectedStatus?.(status);
                } else updateTaskColumn?.(status);
                setShowStatuses(!showStatuses);
              }}
            >
              {status}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default StatusDropDown;
