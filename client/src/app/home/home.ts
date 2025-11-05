import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting';
import { CounterComponent } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [GreetingComponent, CounterComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  homeMessage = signal('Hello world!');

  keyUpHandler(event: KeyboardEvent) {
    console.log(`user pressed the ${event.key} key`);
  }
}
