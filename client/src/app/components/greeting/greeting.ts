import { Component, input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  imports: [],
  templateUrl: './greeting.html',
  styleUrl: './greeting.scss',
})
export class GreetingComponent {
  message = input<string>('Hello hello!');
}
