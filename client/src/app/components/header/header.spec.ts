import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Component, provideZonelessChangeDetection } from '@angular/core';
import { HeaderComponent } from './header';
import { AuthService } from '../../services/auth/auth';
import { Location } from '@angular/common';

@Component({ template: '' })
class DummyComponent { }

describe('HeaderComponent', () => {
  let authServiceSpy: any;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    authServiceSpy = {
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(true),
      logout: jasmine.createSpy('logout')
    };

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterModule.forRoot([
          { path: '', component: DummyComponent },
          { path: 'todos', component: DummyComponent },
          { path: 'login', component: DummyComponent }
        ])
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
  });

  it('should create the header', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const header = fixture.componentInstance;
    expect(header).toBeTruthy();
  });

  it('should call logout and navigate to /login on onLogout', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);

    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    fixture.detectChanges();

    const logoutLink = findLiByText(fixture, 'Logout')

    expect(logoutLink).toBeTruthy();

    logoutLink.click();

    await fixture.whenStable();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to /todos when Todos link is clicked', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const todosLink = fixture.debugElement.query(By.css('a[routerlink="/todos"]')).nativeElement;
    todosLink.click();

    expect(todosLink).toBeTruthy();

    await fixture.whenStable();

    expect(location.path()).toBe('/todos');
  });

  it('should navigate to /login when Login link is clicked if not logged in', async () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();

    const loginLink = fixture.debugElement.query(By.css('a[routerlink="/login"]')).nativeElement;

    expect(loginLink).toBeTruthy();

    loginLink.click();

    await fixture.whenStable();

    expect(location.path()).toBe('/login');
  });
});

const findLiByText = (fixture: ComponentFixture<HeaderComponent>, text: string) => {
  const el = fixture.debugElement
    .queryAll(By.css('li'))
    .find(e => e.nativeElement.textContent.trim() === text);
  expect(el).toBeTruthy();
  return el!.nativeElement;
};