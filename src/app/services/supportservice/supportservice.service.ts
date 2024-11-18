import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = 'http://localhost:3000/api/support'; 

  constructor(private http: HttpClient) { }

  
  getSupportDetails(username: string): Observable<any> {
    const token = localStorage.getItem('token');  

    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/tips/${username}`, { headers });
  }
}