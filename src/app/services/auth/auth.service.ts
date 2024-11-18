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

  
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  
  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token); 
  }

  
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token); 
  }

  
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.role || null;
    }
    return null;
  }

  
  getPlan(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.plan || 'Free';  
    }
    return 'Free';  
  }

  
  updatePlan(planType: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-plan`, { plan: planType });
  }

  
  logout() {
    localStorage.removeItem('token');
  }
}