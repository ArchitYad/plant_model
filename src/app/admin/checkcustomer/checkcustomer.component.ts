import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customers/customers.service';
import { AuthService } from '../../services/auth/auth.service'; // Make sure AuthService is imported
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
  errorMessage: string = '';  // To show error messages

  constructor(
    private customerService: CustomerService, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    // Check if the user has the role of admin
    const role = this.authService.getRole();

    if (role !== 'admin') {
      // If the user is not an admin, redirect them or show an error
      this.errorMessage = 'You are not authorized to view this page.';
      this.router.navigate(['/']);  // Redirect to home page or any other page
      return;
    }

    this.customerService.getCustomers().subscribe(
      (data: any) => {
        this.customers = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load customer data.';
        console.error(error);  // Optionally log the error for debugging
      }
    );
  }

  viewCustomerDetails(customerId: string) {
    // Logic to view detailed customer data
    // This can route to another page or open a modal for more details
    this.router.navigate([`/customer/${customerId}`]);
  }
}