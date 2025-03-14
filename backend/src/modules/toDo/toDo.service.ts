import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoDto, UpdateTodoDto } from './todo.dto';
import { Todo, todos } from './todo.entity'; // Import todos from entity

@Injectable()
export class TodoService {
  private todos: Todo[] = [...todos]; // Clone the initial data to prevent mutation

  // Get all todos
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // Add a new todo
  addTodo(createTodoDto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: uuidv4(), // Generate a new UUID
      dueDate: createTodoDto.dueDate || new Date().toISOString().split('T')[0], // Ensure dueDate is valid
      ...createTodoDto,
    };
    this.todos = [...this.todos, newTodo]; // Avoid mutating original array
    return newTodo;
  }

  // Update a todo
  updateTodo(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    const updatedTodo = { ...this.todos[todoIndex], ...updateTodoDto };
    this.todos = this.todos.map((todo, index) =>
      index === todoIndex ? updatedTodo : todo,
    );

    return updatedTodo;
  }

  // Delete a todo
  deleteTodo(id: string): string {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    this.todos = this.todos.filter((todo) => todo.id !== id);
    return `Todo with ID ${id} deleted successfully`;
  }
}
