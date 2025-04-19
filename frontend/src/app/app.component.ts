import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router'; // Remove RouterLink
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HttpClientModule], // Remove RouterLink from here
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'XpenseEase';

  constructor(private http: HttpClient) {}

  getData() {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
      data => console.log(data),
      error => console.error('Error: ', error)
    );
  }
}
