import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth-guard';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), provideHttpClient()]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
