import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  imports: [FormsModule,RouterModule,CommonModule]
})
export class ReportComponent implements OnInit {
  userName: string = '';
  password: string = '';
  showSettings: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userName = localStorage.getItem('loggedInUser') || 'User';
    this.password = localStorage.getItem('loggedInPass') || '';
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInPass');
    this.router.navigate(['/login']);
  }

  openSettings() {
    this.showSettings = true;
  }

  closeSettings() {
    this.showSettings = false;
  }

  saveChanges() {
    localStorage.setItem('loggedInUser', this.userName);
    localStorage.setItem('loggedInPass', this.password);
    this.userName = localStorage.getItem('loggedInUser') || 'User'; // refresh displayed name
    this.closeSettings();
  }
  
  passwordVisible: boolean = false;

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}

}
