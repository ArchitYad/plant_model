import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      // Get the role from the AuthService (can be 'admin' or 'customer')
      this.role = this.authService.getRole();
      console.log(this.role);
    }
  }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}