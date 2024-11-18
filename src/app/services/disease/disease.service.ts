import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private detectUrl = 'http://localhost:3000/api/detect/diseases'; 

  constructor(private http: HttpClient) {}

  
  isPremium(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;  
    }

    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      return decodedToken.plan === 'Premium'; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return false; 
    }
  }

  detectDisease(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); 
    console.log(token);
    if (!token) {
      return new Observable((observer) => {
        observer.error('No JWT token found!');
      });
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    
    return this.http.post(this.detectUrl, formData, { headers });
  }
}