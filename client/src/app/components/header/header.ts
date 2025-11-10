import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private authService: AuthService = inject(AuthService);
  private readonly router = inject(Router);

  title = 'My First Angular App';

  isLoggedIn = this.authService.isLoggedIn;

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
