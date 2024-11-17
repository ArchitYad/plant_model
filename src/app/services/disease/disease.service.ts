import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
  private detectUrl = 'http://localhost:3000/api/detect/diseases'; // Update this with your API endpoint

  constructor(private http: HttpClient) {}

  // This method checks if the user has a premium plan, you can adjust this based on your logic
  isPremium(): boolean {
    // You can add actual logic to determine if the user is premium
    return true; // Placeholder
  }

  detectDisease(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token'); // Get JWT from localStorage
    console.log(token);
    if (!token) {
      return new Observable((observer) => {
        observer.error('No JWT token found!');
      });
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the form data with the headers containing the JWT token
    return this.http.post(this.detectUrl, formData, { headers });
  }
}