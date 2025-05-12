// OG Code
// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { FormDataService } from '../../services/form-data.service';
// import { format } from 'path';
// @Component({
//   selector: 'app-coordinate',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './coordinate.component.html',
//   styleUrls: ['./coordinate.component.css'],
// })
// export class CoordinateComponent {
//   savedValues: any = null;
//   successMessage: string = '';
//   errorMessage: string = ''; 
//   constructor(private formDataService: FormDataService) {}
//   onSubmit(form: any): void {
//     const { rows, columns, colors } = form.value;
    
//     if (
//       rows < 1 || rows > 1000 ||
//       columns < 1 || columns > 702 ||
//       colors < 1 || colors > 10
//     ) {
//       this.successMessage = ''; 
//       this.errorMessage = 'Error: One or more values are out of range.'; 
//       if(this.errorMessage !== '') {
//         alert(this.errorMessage);
//       }
//       return;
//     }

//     this.savedValues = form.value;
//     this.formDataService.updateFormData(this.savedValues);
//     this.successMessage = 'Values saved successfully!';
//     this.errorMessage = ''; 
//   }

// }




// Improved Color Coordinate Page
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

  rows: number | null = null;
  columns: number | null = null;
  colorCount: number | null = null;
  
  selectedColors: any[] = [];

  validColors = [
    { name: 'Red',   hex: '#FF0000' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Green',  hex: '#00FF00' },
    { name: 'Blue',   hex: '#0000FF' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Grey',   hex: '#808080' },
    { name: 'Brown',  hex: '#A52A2A' },
    { name: 'Black',  hex: '#000000' },
    { name: 'Teal',   hex: '#008080' }
  ];

  constructor(private formDataService: FormDataService) {}

  onColorCountChange(value: number): void {
    this.colorCount = value;
    this.selectedColors = Array(value).fill(null);
  }

  isColorSelected(color: any, currentIndex: number): boolean {
    return this.selectedColors.some(
      (c, i) => i !== currentIndex && c && c.name === color.name
    );
  }

  getArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  onSubmit(form: any): void {
    const { rows, columns } = form.value;
    const colorCount = this.colorCount;

    if (rows < 1 || rows > 1000 || columns < 1 || columns > 702) {
      this.successMessage = '';
      this.errorMessage = 'Error: Rows must be between 1-1000 and Columns between 1-702.';
      alert(this.errorMessage);
      return;
    }

    if (!colorCount || colorCount < 1 || colorCount > 10) {
      this.successMessage = '';
      this.errorMessage = `Error: Color count must be between 1 and 10.`;
      alert(this.errorMessage);
      return;
    }

    for (let i = 0; i < colorCount; i++) {
      if (!this.selectedColors[i]) {
        this.successMessage = '';
        this.errorMessage = `Error: Please select a color for row ${i + 1}.`;
        alert(this.errorMessage);
        return;
      }
    }

    const names = this.selectedColors.map(c => c.name);
    if (new Set(names).size !== names.length) {
      this.successMessage = '';
      this.errorMessage = 'Error: Duplicate colors selected. Please ensure each row has a unique color.';
      alert(this.errorMessage);
      return;
    }

    this.savedValues = {
      rows,
      columns,
      selectedColors: this.selectedColors
    };

    this.formDataService.updateFormData(this.savedValues);
    this.successMessage = 'Values saved successfully!';
    this.errorMessage = '';
  }
}