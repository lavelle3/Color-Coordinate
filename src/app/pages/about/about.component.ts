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
      name: 'Devin',
      bio: "",
      profileImage: '/fatfatmillycat.jpg' 
      // profile image is a placeholder, NgSrc breaks without a link
      // put your images in Color-Coordinate/public
    },
    {
      name: 'Edgar',
      bio: "",
      profileImage: '/fatfatmillycat.jpg'
      // profile image is a placeholder, NgSrc breaks without a link
      // put your images in Color-Coordinate/public
    },
    {
      name: 'Nick',
      bio: "",
      profileImage: '/fatfatmillycat.jpg'
      // profile image is a placeholder, NgSrc breaks without a link
      // put your images in Color-Coordinate/public
    },
    {
      name: 'Charlie Braun',
      bio: "Hey! I'm Charlie Braun, a Business major, who took Computer Science as a side interest minor. I felt it would be a fun way to fill my AUCC credits, and have really enjoyed completing it.",
      profileImage: '/CBraunHeadshotSquare.jpg'
    }
  ];
}
