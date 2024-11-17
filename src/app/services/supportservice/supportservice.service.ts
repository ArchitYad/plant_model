import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'http://localhost:3000/api/support'; // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  // Fetch maintenance tips for a given username
  getSupportDetails(username: string): Observable<any> {
    const token = localStorage.getItem('token');  // Get the token from localStorage or your auth state management

    // If token exists, attach it to the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/tips/${username}`, { headers });
  }
}