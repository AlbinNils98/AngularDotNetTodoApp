import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main>
    <router-outlet />
    </main>
  `,
  styles: [`
  main { 
    padding: 16px;
    }`],
})
export class App {
  protected readonly title = signal('first-ng-app');
}
