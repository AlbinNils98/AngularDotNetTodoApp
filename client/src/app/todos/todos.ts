import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItemComponent } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  selector: 'app-todos',
  imports: [TodoItemComponent, FormsModule, FilterTodosPipe],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class TodosComponent implements OnInit {
  todoService = inject(TodosService);
  todoItems = signal<Array<Todo>>([]);
  searchTerm = signal('');
  newTodoTitle = signal('');

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodosFromApi()
      .pipe(catchError((err) => {
        console.error('Error fetching todos:', err);
        throw err;
      })
      ).subscribe((todos) => {
        this.todoItems.set(todos);
      });
  }

  updateTodoItem(todoItem: Todo) {
    this.todoService.updateTodoCompletion(
      {
        ...todoItem,
        isCompleted: !todoItem.isCompleted
      }).pipe(
        catchError((err) => {
          console.error('Error updating todo:', err);
          throw err;
        })
      ).subscribe({
        next: () => {
          // refetch manually
          this.fetchTodos();
        },
        error: (err) => console.error(err)
      });
  }

  addTodoItem(title: string) {
    const newTodo: { title: string, isCompleted: boolean } = {
      title,
      isCompleted: false
    };
    this.todoService.addTodoItem(newTodo)
      .pipe(catchError((err) => {
        console.error('Error adding todo:', err);
        throw err;
      })
      ).subscribe({
        next: () => {
          this.fetchTodos();
        }
      });

    this.newTodoTitle.set('');
  }

  deleteTodoItem(todoId: number) {
    this.todoService.deleteTodoItem(todoId)
      .pipe(catchError((err) => {
        console.error('Error deleting todo:', err);
        throw err;
      })
      ).subscribe({
        next: () => {
          this.fetchTodos();
        }
      });
  }

}
