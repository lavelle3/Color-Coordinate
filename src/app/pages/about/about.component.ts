import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Devin __',
      bio: "",
      profileImage: ''
    },
    {
      name: 'Edgar',
      bio: "",
      profileImage: ''
    },
    {
      name: 'Nick',
      bio: "",
      profileImage: ''
    },
    {
      name: 'Charlie Braun',
      bio: "Hey! I'm Charlie Braun, a Business major, who took Computer Science as a side interest minor. I felt it would be a fun way to fill my AUCC credits, and have really enjoyed completing it.",
      profileImage: ''
    }
  ];
}
