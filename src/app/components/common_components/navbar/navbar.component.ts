import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'  
})
export class NavbarComponent {
  navLinks = [
    {id:1, href: '#', text: 'Home', cssClass: 'link-secondary' },
    {id:2, href: '/gameoflife', text: 'Game of Life', cssClass: 'link-dark' } 
  ];
}
