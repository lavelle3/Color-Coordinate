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
      bio: "Hello, my name is Devin Lucas. I'm a junior Computer Science major at Coloraedo State. I love to ski, SCUBA Dive, work out, and read.",
      profileImage: '/DevinPFP.jpg' 
      // profile image is a placeholder, NgSrc breaks without a link
      // put your images in Color-Coordinate/public
    },
    {
      name: 'Edgar Flores',
      bio: "Hello, my name is Edgar! I'm a junior Computer Science major minoring in Chemistry. I decided to take this course because I felt web development would be a beneficial skill for me to learn and overall I have found this course fun and informative.",
      profileImage: '/Edgar_image.jpg'
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
