import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  email: string = '';
  password: string = '';

  user = {
    name: '',
    email: '',
    password: ''
  };

  isSignUpActive: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#B9F2C5';
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = '';
  }

  toggleForms() {
    this.isSignUpActive = !this.isSignUpActive;
  }

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        // Automatically switch to login form after successful registration
        this.isSignUpActive = false;
        // Optionally, clear the form if needed
        this.user.password = '';
      },
      error => {
        console.error('Registration error:', error);
        alert('Error: ' + (error.error?.message || 'Something went wrong'));
      }
    );
  }

  login() {
    this.authService.login(this.user).subscribe(
      response => {
        const email = this.user.email;
        const nameFromEmail = email.substring(0, email.indexOf('@'));
  
        localStorage.setItem('loggedInUser', nameFromEmail);
        localStorage.setItem('loggedInPass', this.user.password); // Optional
  
        window.location.href = '/report';  // Redirect to dashboard
      },
      error => {
        console.error('Login error:', error);
        alert('Error: ' + (error.error?.message || 'Something went wrong'));
      }
    );
  }
  

  passwordVisible: boolean = false;
  signUpPasswordVisible: boolean = false;


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleSignUpPasswordVisibility() {
    this.signUpPasswordVisible = !this.signUpPasswordVisible;
  }
}

