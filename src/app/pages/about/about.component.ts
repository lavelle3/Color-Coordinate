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
      name: 'Nick Lavelle',
      bio: "My name is Nick and I am a computer science major and am about to graduate this semester. Following graduation, I will be going to Cyber technical school in the Air Force.",
      profileImage: '/nick_picture.png'
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
