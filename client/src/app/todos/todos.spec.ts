import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosComponent } from './todos';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DummyComponent } from '../../test/Dummy';
import { ApiService } from '../services/api/api';
import { of } from 'rxjs';
import { TodosService } from '../services/todos/todos';
import { By } from '@angular/platform-browser';
import { TodoItemComponent } from '../components/todo-item/todo-item';

describe('Todos', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todoServiceSpy: any;

  beforeEach(async () => {
    todoServiceSpy = {
      getTodosFromApi: jasmine.createSpy('getTodosFromApi').and.returnValue(of([
        { id: 1, title: 'Test Todo 1', isCompleted: false },
        { id: 2, title: 'Test Todo 2', isCompleted: true }
      ])),
      updateTodoItem: jasmine.createSpy('updateTodoItem').and.returnValue(of(true)),
      addTodoItem: jasmine.createSpy('addTodoItem').and.returnValue(of(true)),
      deleteTodoItem: jasmine.createSpy('deleteTodoItem').and.returnValue(of(true)),
    }

    await TestBed.configureTestingModule({
      imports: [TodosComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ApiService, useValue: {} },
        { provide: TodosService, useValue: todoServiceSpy }

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading if empty todo list and not if there are any', () => {
    let loadingPrompt = fixture.debugElement.query(By.css('.todolist p'));

    expect(loadingPrompt).toBeNull();

    component.todoItems.set([]);

    fixture.detectChanges();

    loadingPrompt = fixture.debugElement.query(By.css('.todolist p'));

    expect(loadingPrompt.nativeElement).toBeTruthy();

    expect(loadingPrompt.nativeElement.textContent).toContain('Loading...')

    component.todoItems.set(
      [
        { id: 1, title: 'Test Todo 1', isCompleted: false },
        { id: 2, title: 'Test Todo 2', isCompleted: true }
      ]
    )

    fixture.detectChanges();

    loadingPrompt = fixture.debugElement.query(By.css('.todolist p'));

    expect(loadingPrompt).toBeNull();
  });

  it('should show list of todo items if there are any', () => {

    const todoElements = fixture.debugElement.queryAll(By.css('app-todo-item'));
    expect(todoElements.length).toBe(2);

    const loadingPrompt = fixture.debugElement.query(By.css('.todolist p'));

    expect(loadingPrompt).toBeNull();
  });

  it('should filter todos when inputing searchterm', () => {
    let todoElements = fixture.debugElement.queryAll(By.css('app-todo-item'));
    expect(todoElements.length).toBe(2);

    const searchInput: HTMLInputElement = fixture.debugElement.query(By.css('input[name="searchTerm"]')).nativeElement;
    searchInput.value = 'Test Todo 1';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    todoElements = fixture.debugElement.queryAll(By.css('app-todo-item'));
    expect(todoElements.length).toBe(1);
    const compInstance = todoElements[0].componentInstance as TodoItemComponent;
    expect(compInstance.todo().title).toBe('Test Todo 1');

    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    todoElements = fixture.debugElement.queryAll(By.css('app-todo-item'));

    expect(todoElements.length).toBe(2);
  });

  it('should call TodosService.addTodoItem when inputing title and pressing add button', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input[name="newTodoTitle"]')).nativeElement;
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.todolist__addForm button')).nativeElement;

    input.value = 'New Task';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(todoServiceSpy.addTodoItem).toHaveBeenCalledWith({ title: 'New Task', isCompleted: false });
      expect(component.newTodoTitle()).toBe('');
      expect(input.value).toBe('');
    });
  });

  it('should not call TodoService.addTodoItem if no value in input', () => {
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input[name="newTodoTitle"]')).nativeElement;
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('.todolist__addForm button')).nativeElement;

    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(todoServiceSpy.addTodoItem).not.toHaveBeenCalled();

    input.value = '    ';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    button.click();
    fixture.detectChanges();

    expect(todoServiceSpy.addTodoItem).not.toHaveBeenCalled();
  });
});
