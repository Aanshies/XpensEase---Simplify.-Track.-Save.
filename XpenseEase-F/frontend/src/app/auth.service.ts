import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // tree-shakable provider for AuthService
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';  // Replace with your API URL

  constructor(private http: HttpClient) { }  // Inject HttpClient here

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
