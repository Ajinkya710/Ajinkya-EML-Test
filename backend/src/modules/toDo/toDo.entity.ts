import * as moment from 'moment'; // Use named import

export interface Todo {
  id: string;
  todo: string;
  completed: number;
  userId: string;
  dueDate: string;
}

export enum STATUS {
  INCOMPLETE = 0,
  COMPLETE,
}

export const todos: Todo[] = [
  {
    id: '0afe1026-85ea-439d-ab61-5076c5f81f3e',
    todo: 'Do something nice for someone you care about',
    completed: 0,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-04-15').format('YYYY-MM-DD'),
  },
  {
    id: 'a16df141-f57d-4f5e-bc0c-29dd33f691f5',
    todo: 'Memorize a poem',
    completed: 1,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-05-10').format('YYYY-MM-DD'),
  },
  {
    id: '6854060e-0873-4d9c-a6ef-257ca5f21aae',
    todo: 'Watch a classic movie',
    completed: 1,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-03-20').format('YYYY-MM-DD'),
  },
  {
    id: 'da438989-5978-463e-a29f-59aa38b7842f',
    todo: 'Watch a documentary',
    completed: 0,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-04-01').format('YYYY-MM-DD'),
  },
  {
    id: '885713d9-bfeb-4cf8-a700-10a427bc5946',
    todo: 'Invest in cryptocurrency',
    completed: 1,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-06-15').format('YYYY-MM-DD'),
  },
  {
    id: '5cd925c9-2fda-4927-b409-dc80adc1f459',
    todo: 'Contribute code or a monetary donation to an open-source software project',
    completed: 1,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-03-25').format('YYYY-MM-DD'),
  },
  {
    id: '4f0040e0-6e34-423a-9086-5f1b6dfc8be3',
    todo: "Solve a Rubik's cube",
    completed: 0,
    userId: '901ff7b6-da6f-4789-9f24-012035416879',
    dueDate: moment('2025-07-01').format('YYYY-MM-DD'),
  },
];
