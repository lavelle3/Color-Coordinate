import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coordinate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './coordinate.component.html',
  styleUrls: ['./coordinate.component.css'],
})
export class CoordinateComponent {
  onSubmit() {
    console.log('Form submitted! 🚨');
  }
}
