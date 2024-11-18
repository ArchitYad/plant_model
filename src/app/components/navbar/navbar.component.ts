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
   
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      
      this.role = this.authService.getRole();
      console.log(this.role);
    }
  }

  logout() {
    
    this.authService.logout();
    
    this.router.navigate(['/login']);
  }
}