import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';
import { ApiService } from '../api/api';
import { of } from 'rxjs';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Auth', () => {
  let service: AuthService;
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiSpy = jasmine.createSpyObj('ApiService', ['post']);
    apiSpy.post.and.returnValue(of({ token: 'mock-token' }));

    TestBed.configureTestingModule({
      imports: [BrowserTestingModule],
      providers: [
        provideZonelessChangeDetection(),
        AuthService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });

    service = TestBed.runInInjectionContext(() => TestBed.inject(AuthService));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token on login', (done) => {
    service.login('user', 'pass').subscribe(() => {
      expect(service.token).toBe('mock-token');
      done();
    });
  });

  it('should clear token on logout', () => {
    service.logout();
    expect(service.token).toBeNull();
  });
});
