import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.baseURL}/register`, userData);
  }

  login(userData: any) {
    return this.http.post(`${this.baseURL}/login`, userData);
  }
}
