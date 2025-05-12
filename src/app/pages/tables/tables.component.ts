import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
import { ColorService, Color } from '../../services/color.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tables',
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  radioColor: { name: string; hex_value: string } = { name: '', hex_value: '' };
  receivedData: any;
  displayedColors: Color[] = [];
  selectedColors: any[] = [];
  cellColors: { [key: string]: string } = {};
  rowCellCoordinates: { [rowIndex: number]: string[] } = {};
  columnHeaders: string[] = [];
  paintingTableRows: number[] = [];
  validColors: Color[] = [];
  colorCount: number = 0; // Store the color count

  constructor(
    private formDataService: FormDataService,
    private colorService: ColorService // Inject ColorService
  ) {}

  ngOnInit() {
    // Fetch colors from the database
    this.colorService.getColors().subscribe({
      next: (data: Color[]) => {
        this.validColors = data;
        console.log('Fetched colors:', this.validColors);
      },
      error: (err: any) => {
        console.error('Failed to load colors', err);
      }
    });

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

    // Subscribe to form data changes
    this.formDataService.formData$.subscribe(data => {
      this.receivedData = data;
      console.log('Got data from form:', data);

      const rowCount = Number(data?.rows);
      const colCount = Number(data?.columns);

      if (!isNaN(this.colorCount) && this.colorCount > 0 && this.colorCount <= this.validColors.length) {
        this.displayedColors = this.validColors.slice(0, this.colorCount);
        this.selectedColors = this.validColors.slice(0, this.colorCount);
      } else {
        this.displayedColors = [];
      }

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

  onDropdownChange(selectedColor: { name: string; hex_value: string }, rowIndex: number): void {
    this.radioColor = selectedColor;
    const previousColor = this.displayedColors[rowIndex];
    this.displayedColors[rowIndex] = selectedColor;

    const coordinates = this.rowCellCoordinates[rowIndex];
    if (coordinates) {
      coordinates.forEach(coordinate => {
        this.cellColors[coordinate] = selectedColor.hex_value;
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

      this.cellColors[cellKey] = this.radioColor.hex_value;

      const rowIndex = this.displayedColors.findIndex(color => color.name === this.radioColor.name);
      if (rowIndex !== -1) {
        if (!this.rowCellCoordinates[rowIndex]) {
          this.rowCellCoordinates[rowIndex] = [];
        }

        this.rowCellCoordinates[rowIndex].push(coordinate);
      }
    }
  }

  printPage(): void {
    window.print();
  }
}
