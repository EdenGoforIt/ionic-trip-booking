import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _isAuthenticated = true;
  _userId = 'x1';

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  get userId(): string {
    return this._userId;
  }
  login() {
    this._isAuthenticated = true;
  }

  logout() {
    this._isAuthenticated = false;
  }
}
