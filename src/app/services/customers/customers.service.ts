import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'; // Assuming you have an AuthService for token management

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerUrl = 'http://localhost:3000/api/customers'; // Replace with your actual backend API URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper method to get authorization headers
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all customer data (admin only)
  getCustomers(): Observable<any> {
    return this.http.get(this.customerUrl, { headers: this.getHeaders() });
  }

  // Fetch specific customer data by ID (accessible to the customer themselves or admin)
  getCustomerById(id: string): Observable<any> {
    return this.http.get(`${this.customerUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Add a new customer (admin only)
  addCustomer(customerData: any): Observable<any> {
    return this.http.post(this.customerUrl, customerData, { headers: this.getHeaders() });
  }

  // Update customer data (can be done by the customer themselves or admin)
  updateCustomer(id: string, customerData: any): Observable<any> {
    return this.http.put(`${this.customerUrl}/${id}`, customerData, { headers: this.getHeaders() });
  }

  // Delete customer data (admin only)
  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${this.customerUrl}/${id}`, { headers: this.getHeaders() });
  }
}