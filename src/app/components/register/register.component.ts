import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = 'customer'; 

  constructor(private http: HttpClient, private router: Router) {}  

  onRegister() {
    if (this.username && this.email && this.password && this.role) {
      const user = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: this.role,
      };

      this.http.post('http://localhost:3000/api/auth/register', user)
        .subscribe({
          next: (response) => {
            console.log('User registered successfully!', response);
            alert('Registration successful!');  

            
            this.router.navigate(['/home']);  
          },
          error: (error) => {
            console.error('Error registering user:', error);
            alert('Registration failed. Please try again.'); 
          }
        });
    } else {
      alert('Please fill out all fields');  
    }
  }
}