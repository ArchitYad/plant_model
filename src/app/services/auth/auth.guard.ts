import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authService.getRole();


    if (this.authService.isLoggedIn() && (!expectedRole || userRole === expectedRole)) {
      return true; 
    }

    console.log('Access denied: User role:', userRole, 'Expected role:', expectedRole);
    this.router.navigate(['/login']);
    return false;
  }
}
