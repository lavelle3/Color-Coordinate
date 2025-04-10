import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  onSubmit(form: any): void {
    const { rows, columns, colors } = form.value;

    if (
      rows < 1 || rows > 1000 ||
      columns < 1 || columns > 702 ||
      colors < 1 || colors > 10
    ) {
      this.successMessage = ''; 
      this.errorMessage = 'Error: One or more values are out of range.'; 
      return;
    }

    this.savedValues = form.value;
    this.successMessage = 'Values saved successfully!';
    this.errorMessage = ''; 
  }
}
