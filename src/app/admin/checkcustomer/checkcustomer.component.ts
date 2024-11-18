import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customers/customers.service';
import { AuthService } from '../../services/auth/auth.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkcustomer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkcustomer.component.html',
  styleUrls: ['./checkcustomer.component.css']
})
export class CheckCustomerComponent implements OnInit {
  customers: any[] = [];
  errorMessage: string = '';  

  constructor(
    private customerService: CustomerService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    
    const role = this.authService.getRole();

    if (role !== 'admin') {
      
      this.errorMessage = 'You are not authorized to view this page.';
      this.router.navigate(['/']);  
      return;
    }

    this.customerService.getCustomers().subscribe({
      next: (data: any) => {
        this.customers = data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load customer data.';
        console.error(error);  
      }
    });
  }

  viewCustomerDetails(customerId: string) {
    
    this.router.navigate([`/customer/${customerId}`]);
  }
}