import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatrixsizeformComponent } from '../matrixsizeform/matrixsizeform.component';

@Component({
  selector: 'app-gameoflife',
  standalone: true,
  imports: [MatrixsizeformComponent],
  templateUrl: './gameoflife.component.html',
  styleUrl: './gameoflife.component.css'
})
export class GameoflifeComponent {

}
