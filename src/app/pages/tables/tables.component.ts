import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tables',
  imports: [NgFor,
    CommonModule,
    FormsModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit{
  radioColor: { name: string; hex: string } = { name: '', hex: '' };
  receivedData: any;
  displayedColors: { name: string; hex: string }[] = [];
  selectedColors: any[] = [];
  cellColors: { [key: string]: string } = {};
  rowCellCoordinates: { [rowIndex: number]: string[] } = {};
  columnHeaders: string[] = [];
  paintingTableRows: number[] = [];

  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.formDataService.formData$.subscribe(data => {
      this.receivedData = data;
      console.log('Got data from form:', data);

      const colorCount = Number(data?.colors);
      // Table 2
      const rowCount = Number(data?.rows);
      const colCount = Number(data?.columns);

      if (!isNaN(colorCount) && colorCount > 0 && colorCount <= this.validColors.length) {
        this.displayedColors = this.validColors.slice(0, colorCount);
        this.selectedColors = this.validColors.slice(0, colorCount);
      } else {
        this.displayedColors = [];
      }
      // Table 2
      if (!isNaN(rowCount) && rowCount > 0 && rowCount <= 1000) {
        this.paintingTableRows = Array.from({ length: rowCount }, (_, i) => i + 1);
      }
      if (!isNaN(colCount) && colCount > 0 && colCount <= 702) {
        this.columnHeaders = this.generateColumnHeaders(colCount);
      }
    });
  }
  isColorSelected(color: any, currentIndex: number): boolean {
    return this.selectedColors.some((c, i) =>
      i !== currentIndex && c?.name === color.name
    );
  }
  

  getCellColor(row: number, col: string): string {
    const cellKey = `${row}${col}`; 
    return this.cellColors[cellKey] || ''; 
  }
  onDropdownChange(selectedColor: { name: string; hex: string }, rowIndex: number): void {
    this.radioColor = selectedColor;
    const previousColor = this.displayedColors[rowIndex];
    this.displayedColors[rowIndex] = selectedColor;

    const coordinates = this.rowCellCoordinates[rowIndex];
    if (coordinates) {
        coordinates.forEach(coordinate => {
            this.cellColors[coordinate] = selectedColor.hex;
        });
    }
}
  generateColumnHeaders(colCount: number): string[] {
    const headers = [];
    for (let i = 0; i < colCount; i++) {
        let columnName = '';
        let index = i;
        do {
            columnName = String.fromCharCode(65 + (index % 26)) + columnName;
            index = Math.floor(index / 26) - 1;
        } while (index >= 0);
        headers.push(columnName);
    }
    return headers;
  }

  onCellClick(row: number, col: string): void {
    if (this.radioColor) {
        const cellKey = `${row}${col}`;
        const coordinate = `${row}${col}`;

        Object.keys(this.rowCellCoordinates).forEach(key => {
            const rowIndex = Number(key); 
            const index = this.rowCellCoordinates[rowIndex]?.indexOf(coordinate);
            if (index !== -1) {
                this.rowCellCoordinates[rowIndex].splice(index, 1); 
            }
        });

        this.cellColors[cellKey] = this.radioColor.hex;

        const rowIndex = this.displayedColors.findIndex(color => color.name === this.radioColor.name);
        if (rowIndex !== -1) {
          if (!this.rowCellCoordinates[rowIndex]) {
            this.rowCellCoordinates[rowIndex] = [];
        }
        this.rowCellCoordinates[rowIndex].push(coordinate);
        
        // ✅ Sort coordinates: letter(s) first, number second (e.g., A1, A2, B1...)
        this.rowCellCoordinates[rowIndex].sort((a, b) => {
          const colA = a.match(/[A-Z]+/)![0];
          const rowA = parseInt(a.match(/\d+/)![0]);
          const colB = b.match(/[A-Z]+/)![0];
          const rowB = parseInt(b.match(/\d+/)![0]);
        
          if (colA < colB) return -1;
          if (colA > colB) return 1;
          return rowA - rowB;
        });
        }
    }
}

  printPage(): void {
    window.print();
  }

  validColors = 
  [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Green', hex: '#00FF00' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Black', hex: '#000000' },
    { name: 'Teal', hex: '#008080' },
  ]
}
