import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo, todos } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [...todos];

  // Get all todos
  getAllTodos(): { status: string; data: Todo[] } {
    return {
      status: 'success',
      data: this.todos,
    };
  }

  // Add a new todo
  addTodo(createTodoDto: CreateTodoDto): { status: string; data: Todo } {
    const newTodo: Todo = {
      id: uuidv4(),
      dueDate: createTodoDto.dueDate,
      ...createTodoDto,
    };

    this.todos = [...this.todos, newTodo];

    return {
      status: 'success',
      data: newTodo,
    };
  }

  // Update a todo
  updateTodo(id: string, updateTodoDto: UpdateTodoDto): { status: string; data: Todo } {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException({
        status: 'fail',
        message: `Todo with ID ${id} not found`,
      });
    }

    const updatedTodo = { ...this.todos[todoIndex], ...updateTodoDto };
    this.todos = this.todos.map((todo, index) =>
      index === todoIndex ? updatedTodo : todo,
    );

    return {
      status: 'success',
      data: updatedTodo,
    };
  }

  // Delete a todo
  deleteTodo(id: string): { status: string; message: string } {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException({
        status: 'fail',
        message: `Todo with ID ${id} not found`,
      });
    }

    this.todos = this.todos.filter((todo) => todo.id !== id);

    return {
      status: 'success',
      message: `Todo with ID ${id} has been deleted`,
    };
  }
}
