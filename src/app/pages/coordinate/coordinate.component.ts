import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
import { ColorService, Color } from '../../services/color.service'; // Import ColorService

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
  colorCount: number = 10; // Store the color count
  constructor(
    private formDataService: FormDataService,
    private colorService: ColorService
  ) {}
  ngOnInit() {
        // Fetch color count from the database
        this.colorService.getColorCount().subscribe({
          next: (data: { count: number }) => {
            this.colorCount = data.count;
            console.log('Fetched color count:', this.colorCount);
          },
          error: (err: any) => {
            console.error('Failed to load color count', err);
          }
        });
      }
  onSubmit(form: any): void {
    const { rows, columns, colors } = form.value;
    
    if (
      rows < 1 || rows > 1000 ||
      columns < 1 || columns > 702 ||
      colors < 1 || colors > this.colorCount
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
