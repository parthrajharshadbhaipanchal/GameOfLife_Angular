import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Output } from '@angular/core';
import { CellComponent } from '../golmatrix/cell/cell.component';
import { GolmatrixComponent } from '../golmatrix/golmatrix.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gameoflife',
  standalone: true,
  imports: [CommonModule,FormsModule,CellComponent,GolmatrixComponent],
  templateUrl: './gameoflife.component.html',
  styleUrl: './gameoflife.component.css'
})
export class GameoflifeComponent {

  @Output() public matrixSizParent:number=0;

  public submitButtonClicked(event:any){    
    this.matrixSizParent=event.target.matrixSize.value;
  }
}
