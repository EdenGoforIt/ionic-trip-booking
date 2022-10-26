import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _isAuthenticated = true;
  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  login() {
    this._isAuthenticated = true;
  }

  logout() {
    this._isAuthenticated = true;
  }
}
