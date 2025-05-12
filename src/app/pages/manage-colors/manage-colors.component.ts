import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorService, Color } from '../../services/color.service';  
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-colors',
  templateUrl: './manage-colors.component.html',
  styleUrls: ['./manage-colors.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class ManageColorsComponent {
  newColorName: string = '';
  newColorHex: string = '';
  addSuccess = false;
  addError = false;

  selectedDeleteColorName: string = '';
  deleteConfirm = false;
  deleteError = false;

  colors: Color[] = [];
  selectedEditColorName: string = '';
  editColorName: string = '';
  editColorHex: string = '';
  editSuccess = false;
  editError = false;

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.fetchColors();
  }

  addColor() {
    this.colorService.addColor({ name: this.newColorName, hex_value: this.newColorHex }).subscribe({
      next: () => {  
        console.log('Color added:', this.newColorName);
        this.addSuccess = true;
        this.addError = false;
        this.newColorName = '';
        this.newColorHex = '';
        this.fetchColors();   
      },
      error: (err: any) => {  
        console.error('Error adding color:', err);
        this.addSuccess = false;
        this.addError = true;
      }
    });
  }

  editColor() {
    this.colorService.editColor(this.selectedEditColorName, this.editColorName, this.editColorHex).subscribe({
      next: () => {
        console.log('Color edited:', this.editColorName);
        this.editSuccess = true;
        this.editError = false;
        this.fetchColors();
      },
      error: (err: any) => {
        console.error('Error editing color:', err);
        this.editSuccess = false;
        this.editError = true;
      }
    });
  }

  prepareDelete(name: string) {
    this.selectedDeleteColorName = name;
    this.deleteConfirm = true;
    this.deleteError = false;
  }

  confirmDelete() {
    if (this.colors.length <= 2) {
      this.deleteError = true;
      this.deleteConfirm = false;
      return;
    }

    this.colorService.deleteColor(this.selectedDeleteColorName).subscribe({
      next: () => {
        console.log('Color deleted:', this.selectedDeleteColorName);
        this.deleteConfirm = false;
        this.deleteError = false;
        this.fetchColors();
      },
      error: (err: any) => {
        console.error('Error deleting color:', err);
        this.deleteError = true;
      }
    });
  }

  cancelDelete() {
    this.selectedDeleteColorName = '';
    this.deleteConfirm = false;
    this.deleteError = false;
  }

  fetchColors() {
    this.colorService.getColors().subscribe({
      next: (data: Color[]) => this.colors = data,
      error: (err: any) => console.error('Failed to load colors', err)
    });
  }
}