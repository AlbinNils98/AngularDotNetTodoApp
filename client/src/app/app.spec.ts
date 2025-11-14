import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApiService } from './services/api/api';
import { AuthService } from './services/auth/auth';
import { ActivatedRoute } from '@angular/router';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        { provide: ApiService, useValue: {} },
        { provide: AuthService, useValue: {} },
        {
          provide: ActivatedRoute, useValue: {
            snapshot:
              { paramMap: new Map() }
          }
        }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
