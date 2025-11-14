import { inject, Injectable } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { ApiService } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class TodosService {

  private api = inject(ApiService);

  getTodosFromApi() {
    const url = 'api/todos';
    return this.api.get<Array<Todo>>(url);
  }

  updateTodoItem(todo: Todo) {
    const url = `api/todos/${todo.id}`;
    return this.api.put<Todo>(url, todo);
  }

  addTodoItem(todo: { title: string, isCompleted: boolean }) {
    const url = `api/todos`;
    return this.api.post<Todo>(url, todo);
  }

  deleteTodoItem(id: number) {
    const url = `api/todos/${id}`;
    return this.api.delete<void>(url);
  }
}
