import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 
  jwtHelper = new JwtHelperService(); 

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Decode token using JwtHelperService
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token); // Using JwtHelperService to decode the token
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token); 
  }

  // Get JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get user's role from the token
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role || null;
    }
    return null;
  }

  // Get user's plan from the token (Free or Premium)
  getPlan(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.plan || 'Free';  // Default to 'Free' if no plan is found
    }
    return 'Free';  // Default to 'Free' if no token is found
  }

  // Update user's plan (e.g., after successful payment)
  updatePlan(planType: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-plan`, { plan: planType });
  }

  // Log out the user by removing the token from local storage
  logout() {
    localStorage.removeItem('token');
  }
}