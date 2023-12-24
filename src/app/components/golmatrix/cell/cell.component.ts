import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {

  @Input() public SurroundActiveStatus: boolean[] = [
    false, false, false,
    false, false,
    //true,true,
    false, false, false
  ];
  public IsActive: boolean = false;
  @Input() public IsLast:boolean=false;
  @Input() public DivisionId?:number;

  ProceedNextGeneration() {
    if (this.IsActive) {
      this.IsActive = (this.SurroundActiveStatus.filter(x => x).length in [2, 3])
    } else {
      this.IsActive = (this.SurroundActiveStatus.filter(x => x)).length == 3;
    }
  }
}