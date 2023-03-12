export type Subtask = {
  title: string;
  isCompleted: boolean;
};

export type Task = {
  id: number | string;
  title: string;
  description: string;
  status: string;
  statusId: number | string;
  subtasks: Subtask[];
};

export type Column = {
  id: number | string;
  name: string;
  tasks: Task[];
};

export type Board = {
  id: number | string;
  name: string;
  columns: Column[];
};

export type AppDataType = {
  boards: Board[];
};

export type SelectedTask = {
  id : string | number
  status:string
}

export type DeleteType = {
  status: boolean;
  type: string;
  id: string | number;
}
