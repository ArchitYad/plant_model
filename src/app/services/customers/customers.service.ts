import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = 'http://localhost:3000/api/customers'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  
  getCustomers(): Observable<any> {
    return this.http.get(this.customerUrl, { headers: this.getHeaders() });
  }

 
  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.customerUrl}/${id}`, { headers: this.getHeaders() });
  }

  
  addCustomer(customerData: any): Observable<any> {
    return this.http.post(this.customerUrl, customerData, { headers: this.getHeaders() });
  }

  
  updateCustomer(id: string, customerData: any): Observable<any> {
    return this.http.put(`${this.customerUrl}/${id}`, customerData, { headers: this.getHeaders() });
  }

  
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.customerUrl}/${id}`, { headers: this.getHeaders() });
  }
}