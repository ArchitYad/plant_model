import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ensure FormsModule for two-way data binding
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'customer';  // Default to 'customer' role

  constructor(private authService: AuthService, private router: Router) {}

  // This method is triggered when the form is submitted
  onLogin() {
    console.log('Login button clicked');
    
    const credentials = {
      email: this.email,
      password: this.password,
      role: this.role  // Pass role to the login service if necessary
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);

          // Extract user role from the token or response
          const userRole = this.authService.decodeToken(response.token).role;

          // Navigate based on the role
          if (userRole === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/customer']);
          }
        }
      },
      error: (error) => {
        console.error('Login error', error);
        alert('Login failed. Please check your credentials.'); // Show feedback to the user
      }
    });
  }
}