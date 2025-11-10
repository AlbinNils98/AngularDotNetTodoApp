import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  username = '';
  password = '';

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe({
        next: () => this.router.navigate(['/todos']),
        error: err => console.error(err),
      });

  }
}
