import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item';
import { Component, DebugElement, provideZonelessChangeDetection, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TodoItem', () => {
  let hostFixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;
  let todoItemDebugEl: DebugElement;
  let todoItemComponent: TodoItemComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
      declarations: [HostComponent],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostComponent = hostFixture.componentInstance;

    hostFixture.detectChanges();

    todoItemDebugEl = hostFixture.debugElement.query(By.directive(TodoItemComponent));
    todoItemComponent = todoItemDebugEl.componentInstance;
  });

  it('should create', () => {
    expect(todoItemComponent).toBeTruthy();
  });

  it('should have unchecked checkbox if false isCompleted', () => {
    const checkbox = hostFixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(checkbox.checked).toBe(false);
  });
});

@Component({
  template: `<app-todo-item [todo]="todo"></app-todo-item>`,
  standalone: false
})
class HostComponent {
  todo = signal({ id: 1, title: 'Test Todo', isCompleted: false });
}
