import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModelService } from '../../services/model/model.service';
@Component({
  selector: 'app-managedata',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './managedata.component.html',
  styleUrls: ['./managedata.component.css']
})
export class ManagedataComponent {
  modelForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private modelService: ModelService) {
    this.modelForm = this.fb.group({
      modelFile: [null, Validators.required] 
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.modelForm.patchValue({
        modelFile: file
      });
    }
  }

  onSubmit() {
    if (this.modelForm.valid) {
      const formData = new FormData();
      formData.append('model', this.modelForm.get('modelFile')!.value);

      this.modelService.updateModel(formData).subscribe({
        next: (response) => {
          this.successMessage = 'Model updated successfully!';
          this.errorMessage = null;
          this.modelForm.reset(); 
        },
        error: (error) => {
          this.errorMessage = 'Failed to update model. Please try again.';
          this.successMessage = null;
        }
      });
    }
  }
}