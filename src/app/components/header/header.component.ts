import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateIfNeeded(path: string, event: Event) {
    if (this.router.url === path) {
      event.preventDefault(); 
    }
  }
}