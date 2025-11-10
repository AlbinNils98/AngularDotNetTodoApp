import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  loadComponent: () => {
    return import('./home/home').then(m => m.HomeComponent);
  }
},
{
  path: 'login',
  loadComponent: () => {
    return import('./login/login').then(m => m.LoginComponent);
  }
},
{
  path: 'todos',
  canActivate: [authGuard],
  loadComponent: () => {
    return import('./todos/todos').then(m => m.TodosComponent);
  }
}
];
