
import { Component } from '@angular/core';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodoTitle = '';
  newTodoDescription = '';
  editTodoId: number | null = null;
  editTodoTitle: string = '';
  editTodoDescription: string = '';

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.newTodoTitle.trim() && this.newTodoDescription.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        description: this.newTodoDescription.trim(),
        completed: false,
      };
      this.todoService.addTodo(newTodo);
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.loadTodos();
    } else {
      alert('Title and Description cannot be empty!');
    }
  }

  toggleComplete(todo: Todo): void {
    this.todoService.toggleComplete(todo.id);
    this.loadTodos();
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  startEditing(todo: Todo): void {
    this.editTodoId = todo.id;
    this.editTodoTitle = todo.title;
    this.editTodoDescription = todo.description;
  }

  saveEdit(): void {
    if (this.editTodoTitle.trim() && this.editTodoDescription.trim()) {
      this.todoService.editTodo(this.editTodoId!, this.editTodoTitle.trim(), this.editTodoDescription.trim());
      this.editTodoId = null;
      this.editTodoTitle = '';
      this.editTodoDescription = '';
      this.loadTodos();
    } else {
      alert('Title and Description cannot be empty!');
    }
  }

  cancelEdit(): void {
    this.editTodoId = null;
    this.editTodoTitle = '';
    this.editTodoDescription = '';
  }
}
