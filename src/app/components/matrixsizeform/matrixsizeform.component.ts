import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-matrixsizeform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './matrixsizeform.component.html',
  styleUrl: './matrixsizeform.component.css'
})
export class MatrixsizeformComponent {

  public matrixSize?:number;

  submitMatrixSize(){    
    console.log("Matrix size submitted"+this.matrixSize);
  }
}
