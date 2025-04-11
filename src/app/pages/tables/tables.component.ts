import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormDataService } from '../../services/form-data.service';
@Component({
  selector: 'app-tables',
  imports: [NgFor],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit{
  receivedData: any;
  displayedColors: { name: string; hex: string }[] = [];
  
  constructor(private formDataService: FormDataService) {}

  ngOnInit() {
    this.formDataService.formData$.subscribe(data => {
      this.receivedData = data;
      console.log('Got data from form:', data);

      const colorCount = Number(data?.colors);
      if (!isNaN(colorCount) && colorCount > 0 && colorCount <= this.validColors.length) {
        this.displayedColors = this.validColors.slice(0, colorCount);
      } else {
        this.displayedColors = [];
      }
    });
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
