import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseURL = 'https://xpensease-simplify-track-save.onrender.com';
  //Add your own backend url

  constructor(private http: HttpClient) {}

  register(userData: any) {
    return this.http.post(`${this.baseURL}/register`, userData);
  }

  login(userData: any) {
    return this.http.post(`${this.baseURL}/login`, userData);
  }
}
