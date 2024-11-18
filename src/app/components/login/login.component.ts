import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'customer';  

  constructor(private authService: AuthService, private router: Router) {}

 
  onLogin() {
    console.log('Login button clicked');
    
    const credentials = {
      email: this.email,
      password: this.password,
      role: this.role  
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);

          
          const userRole = this.authService.decodeToken(response.token).role;

          
          if (userRole === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/customer']);
          }
        }
      },
      error: (error) => {
        console.error('Login error', error);
        alert('Login failed. Please check your credentials.'); 
      }
    });
  }
}