type TToDo = {
  id: string;
  todo: string;
  completed: boolean;
  userId: string;
  dueDate: string;
}

type TToDoResponse = TToDo[]

export type { TToDo, TToDoResponse };
