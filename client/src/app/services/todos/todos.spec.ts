import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('Todos', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()]
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
