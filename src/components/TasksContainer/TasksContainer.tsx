import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";
import TaskTile from "../TaskTiles/TaskTile";
import TaskModal from "../TaskModal/TaskModal";
import { SelectedTask, Task } from "../../types/types";
import ColumnAdder from "../ColumnAdder/ColumnAdder";
import { Droppable } from "@hello-pangea/dnd";
import EmptyState from "../EmptyState/EmptyState";
import ColumnHead from "../ColumnHead/ColumnHead";

type Props = {
  setShowColumnForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowBoardForm: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTask: SelectedTask;
  setSelectedTask: React.Dispatch<React.SetStateAction<SelectedTask>>;
};

const TasksContainer = ({
  setShowColumnForm,
  setShowTaskForm,
  setShowBoardForm,
  selectedTask,
  setSelectedTask,
}: Props) => {
  const { currentBoard, hideSidebar } = useGlobalContext()!;

  const [showViewModal, setShowViewModal] = useState(false);

  const boardsAreAvailable = currentBoard?.columns.length > 0;

  return (
    <div
      className={`p-4 flex gap-x-4 items-start justify-between overflow-x-auto min-h-screen md:box-border ${
        hideSidebar ? "md:overflow-visible" : ""
      } mx-auto`}
    >
      {boardsAreAvailable ? (
        <>
          {currentBoard?.columns.map((column, index) => {
            return (
              <div
                key={column.id}
                className="min-w-[90%] mt-[80px] md:mt-[100px] md:min-w-[65%] lg:min-w-[320px] lg:max-w-[320px]"
              >
                <ColumnHead column={column} index={index} />

                <Droppable droppableId={column.name}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`mt-5  ${
                          column.tasks.length < 1
                            ? "border-2 border-opacity-30 border-dashed border-subtextColor min-h-[75vh]"
                            : ""
                        } rounded-lg`}
                      >
                        {column.tasks.map((task, index) => {
                          return (
                            <TaskTile
                              index={index}
                              key={task.id}
                              task={task}
                              setShowViewModal={setShowViewModal}
                              setSelectedTask={setSelectedTask}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}

          {currentBoard?.columns.length < 6 ? (
            <ColumnAdder setShowColumnForm={setShowColumnForm} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <EmptyState setShowBoardForm={setShowBoardForm} />
      )}

      {showViewModal && (
        <TaskModal
          showViewModal={showViewModal}
          setShowViewModal={setShowViewModal}
          selectedTask={selectedTask}
          setShowTaskForm={setShowTaskForm}
          setSelectedTask={setSelectedTask}
        />
      )}
    </div>
  );
};

export default TasksContainer;
