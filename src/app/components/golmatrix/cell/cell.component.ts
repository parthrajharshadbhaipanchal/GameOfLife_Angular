import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent{

  @Input() public IsActive: boolean = false;  
  @Input() public DivisionId?:number;
  @Input() public IsEditingEnabled:boolean=false;

  ngOnChanges(changes: SimpleChanges){
    if (changes['SurroundActiveStatus']) {
    //  this.ProceedNextGeneration();
    }
  }



  CellClickEvent(args:Event){        
    this.IsActive=!this.IsActive;    
  }
}