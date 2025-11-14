import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../services/auth/auth';
import { ApiService } from '../services/api/api';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { DummyComponent } from '../../test/Dummy';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: any;
  let router: Router;
  let navigateSpy: jasmine.Spy;


  beforeEach(async () => {
    authServiceSpy = {
      login: jasmine.createSpy('login').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'todos', component: DummyComponent }
        ]),
        { provide: AuthService, useValue: authServiceSpy },
      ]
    })
      .compileComponents();


    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not login if both fields are empty', () => {
    setInputsAndSubmit(fixture, '', '');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should not login if username is filled but password is empty', () => {
    setInputsAndSubmit(fixture, 'user', '');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should not login if username is empty but password is filled', () => {
    setInputsAndSubmit(fixture, '', 'password');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should not login if inputs contain only spaces', () => {
    setInputsAndSubmit(fixture, '   ', '     ');
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it('should call authservice.login and navigate to /todos on submit', async () => {
    const usernameInput: HTMLInputElement = fixture.debugElement.query(By.css('#username')).nativeElement;
    const passwordInput: HTMLInputElement = fixture.debugElement.query(By.css('#password')).nativeElement;
    const loginButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    usernameInput.value = 'user';
    usernameInput.dispatchEvent(new Event('input'))
    passwordInput.value = 'password';
    passwordInput.dispatchEvent(new Event('input'))

    fixture.detectChanges();

    loginButton.click();

    await fixture.whenStable();

    expect(authServiceSpy.login).toHaveBeenCalledWith('user', 'password')
    expect(navigateSpy).toHaveBeenCalledWith(['/todos'])
  });
});

function setInputsAndSubmit(fixture: ComponentFixture<LoginComponent>, username: string, password: string) {
  const usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
  const passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
  const loginButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

  usernameInput.value = username;
  usernameInput.dispatchEvent(new Event('input'));

  passwordInput.value = password;
  passwordInput.dispatchEvent(new Event('input'));

  fixture.detectChanges();
  loginButton.click();
}
