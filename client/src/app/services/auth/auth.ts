import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../api/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _token = signal<string | null>(null);
  private api = inject(ApiService);

  readonly isLoggedIn = computed(() => !!this._token());

  get token() {
    return this._token();
  }

  login(username: string, password: string) {
    const url = 'api/auth/login';
    return this.api.post<{ token: string }>(url, { username, password })
      .pipe(tap(res => {
        this._token.set(res.token);
      }));
  }
  logout() {
    this._token.set(null);
  }

}
