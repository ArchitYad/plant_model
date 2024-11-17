import { Component } from '@angular/core';
import { DiseaseService } from '../../services/disease/disease.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detect',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.component.css']
})
export class DetectComponent {
  diseaseDetected = false;
  disease: any = {};
  isPremium = false;
  limitReached = false;
  selectedFile: File | null = null;
  loading = false;  // To manage the loading state
  errorMessage = '';  // Variable to hold error messages

  constructor(private diseaseService: DiseaseService) {
    this.isPremium = this.diseaseService.isPremium();
  }

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.errorMessage = '';  // Clear previous errors when a new file is selected
    }
  }

  // Handle disease detection
  onDetect() {
    if (this.selectedFile) {
      this.loading = true;  // Set loading to true before making the API call
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      // Call the disease detection service
      this.diseaseService.detectDisease(formData).subscribe({
        next: (result) => {
          this.loading = false;
          if (result.success) {
            this.disease = result.disease;
            this.diseaseDetected = true;
            this.limitReached = false;
          } else {
            this.limitReached = true;
            this.errorMessage = 'You have reached your trial limit. Upgrade to premium for more detections.';
          }
        },
        error: (error) => {
          this.loading = false;
          console.error(error);
          this.errorMessage = 'An error occurred while detecting the disease. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Please select a file first!';  // Show error if no file is selected
    }
  }

  // Clear detection result and errors (optional)
  clearDetection() {
    this.diseaseDetected = false;
    this.disease = {};
    this.limitReached = false;
    this.selectedFile = null;
    this.errorMessage = '';  // Clear any previous errors
  }
}