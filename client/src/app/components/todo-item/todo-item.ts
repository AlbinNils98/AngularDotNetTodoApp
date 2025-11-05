import { Component, input, output } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { HighlightCompletedTodoDrirective } from '../../directives/highlight-completed-todo';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodoDrirective, UpperCasePipe],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>();

  todoCompleted = output<Todo>();
  todoRemoved = output<number>();

  todoClicked() {
    this.todoCompleted.emit(this.todo());
  }

  removeClicked() {
    this.todoRemoved.emit(this.todo().id);
  }
}
