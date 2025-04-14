import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
@Component({
  selector: 'app-coordinate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.css'],
})
export class CoordinateComponent {
  savedValues: any = null;
  successMessage: string = '';
  errorMessage: string = ''; 
  constructor(private formDataService: FormDataService) {}
  onSubmit(form: any): void {
    const { rows, columns, colors } = form.value;
    
    if (
      rows < 1 || rows > 1000 ||
      columns < 1 || columns > 702 ||
      colors < 1 || colors > 10
    ) {
      this.successMessage = ''; 
      this.errorMessage = 'Error: One or more values are out of range.'; 
      if(this.errorMessage !== '') {
        alert(this.errorMessage);
      }
      return;
    }

    this.savedValues = form.value;
    this.formDataService.updateFormData(this.savedValues);
    this.successMessage = 'Values saved successfully!';
    this.errorMessage = ''; 
  }

}
