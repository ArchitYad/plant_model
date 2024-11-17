import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupportService } from '../../services/supportservice/supportservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  supportForm: FormGroup;
  supportDetails: any;  // Variable for storing maintenance details and tips
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private supportService: SupportService) {
    this.supportForm = this.fb.group({
      username: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.supportForm.valid) {
      const username = this.supportForm.get('username')!.value;
      this.supportService.getSupportDetails(username).subscribe({
        next: (response) => {
          if (response.success) {
            this.supportDetails = response.history; // Store history with maintenance tips
            this.successMessage = 'Maintenance details retrieved successfully!';
            this.errorMessage = null;
          } else {
            this.errorMessage = response.message;
            this.successMessage = null;
            this.supportDetails = null;
          }
        },
        error: (error) => {
          this.errorMessage = 'Failed to retrieve maintenance details. Please try again.';
          this.successMessage = null;
          this.supportDetails = null;
        }
      });
    }
  }
}