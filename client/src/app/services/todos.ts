import { inject, Injectable } from '@angular/core';
import { Todo } from '../model/todo.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  http = inject(HttpClient);

  getTodosFromApi() {
    const url = 'https://localhost:7111/api/todos';
    return this.http.get<Array<Todo>>(url);
  }

  updateTodoCompletion(todo: Todo) {
    const url = `https://localhost:7111/api/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  addTodoItem(todo: { title: string, isCompleted: boolean }) {
    const url = `https://localhost:7111/api/todos`;
    return this.http.post<Todo>(url, todo);
  }

  deleteTodoItem(id: number) {
    const url = `https://localhost:7111/api/todos/${id}`;
    return this.http.delete<void>(url);
  }
}
