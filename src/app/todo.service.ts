
import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosKey = 'todos';

  constructor() {
    const savedTodos = localStorage.getItem(this.todosKey);
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    } else {
  
      this.todos = [
        {
          id: Date.now() + 1,
          title: 'Default To-Do 1',
          description: 'This is a description for the first default to-do.',
          completed: false,
        },
        {
          id: Date.now() + 2,
          title: 'Default To-Do 2',
          description: 'This is a description for the second default to-do.',
          completed: true,
        },
        {
          id: Date.now() + 3,
          title: 'Default To-Do 3',
          description: 'This is a description for the third default to-do.',
          completed: false,
        },
      ];
      this.saveTodos(); 
    }
  }

  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((t) => t.id !== id);
    this.saveTodos();
  }

  toggleComplete(id: number): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  editTodo(id: number, newTitle: string, newDescription: string): void {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.title = newTitle;
      todo.description = newDescription;
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    localStorage.setItem(this.todosKey, JSON.stringify(this.todos));
  }
}

