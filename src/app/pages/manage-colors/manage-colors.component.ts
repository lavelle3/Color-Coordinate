import { Component } from '@angular/core';
import { ColorService, Color } from '../../services/color.service';  

export class ManageColorsComponent {

  //add
  newColorName: string = '';
  newColorHex: string = '';
  addSuccess = false;
  addError = false;

  //edit
  colors: Color[] = [];
  selectedEditColorId: number = 0;
  editColorName: string = '';
  editColorHex: string = '';
  editSuccess = false;
  editError = false;

  constructor(private colorService: ColorService) { }

  ngOnInit() {
    this.fetchColors();
  }

  //add
  addColor() {
    this.colorService.addColor(this.newColorName, this.newColorHex).subscribe({
      next: (color: Color) => {  
        console.log('Color added:', color);
        this.addSuccess = true;
        this.addError = false;
        this.newColorName = '';
        this.newColorHex = '';
        this.fetchColors();   // reload dropdowns after add.
      },
      error: (err: any) => {  
        console.error('Error adding color:', err);
        this.addSuccess = false;
        this.addError = true;
      }
    });
  }

  //edit color
  editColor() {
    this.colorService.editColor(this.selectedEditColorId, this.editColorName, this.editColorHex).subscribe({
      next: (color: Color) => {
        console.log('Color edited:', color);
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

  //helper
  fetchColors() {
    this.colorService.getColors().subscribe({
      next: (data: Color[]) => this.colors = data,
      error: (err: any) => console.error('Failed to load colors', err)
    });
  }
}


