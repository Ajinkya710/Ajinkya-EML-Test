type TToDo = {
  id: string;
  todo: string;
  completed: STATUS;
  userId: string;
  dueDate: string;
}

export enum STATUS {
  INCOMPLETE = 0,
  COMPLETE,
}

type TToDoResponse = {
  data: TToDo[]
}

export type { TToDo, TToDoResponse };
