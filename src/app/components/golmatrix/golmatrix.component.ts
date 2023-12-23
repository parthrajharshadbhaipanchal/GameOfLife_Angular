import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-golmatrix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './golmatrix.component.html',
  styleUrl: './golmatrix.component.css'
})
export class GolmatrixComponent {
 
 @Input() public matrixSize?:number; 

  constructor(){
  }

  ngOnChanges(changes: { [property: number]: any }){
    console.log('ng on change executed : '+ this.matrixSize);
  }


}
