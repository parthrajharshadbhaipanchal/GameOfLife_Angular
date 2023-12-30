import { CommonModule } from '@angular/common';
import { Component, EventEmitter, ComponentRef, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CellComponent } from './cell/cell.component';   
import { BrcomponentComponent } from '../brcomponent/brcomponent.component';

@Component({
  selector: 'app-golmatrix',
  standalone: true,
  imports: [BrcomponentComponent],
  templateUrl: './golmatrix.component.html',
  styleUrl: './golmatrix.component.css'
})
export class GolmatrixComponent {

 @Output() public PushNextGenerationEvent=new EventEmitter();
 @Output() public componentRefsList:ComponentRef<CellComponent>[]=[]; 
 @Input() public matrixSize:number=0; 
 @ViewChild('matrixContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

 
  
  constructor(){  }

  ngOnChanges(){
    this.container?.clear();  
    let totalMatrixElements=this.matrixSize*this.matrixSize;

    for(let i=1;i<=totalMatrixElements;i++)  {      
      let component=this.container.createComponent(CellComponent);      
      component.instance.DivisionId=i;   
     
      this.componentRefsList.push(component);      

      //add line break component
      if(i%this.matrixSize==0){
        this.container.createComponent(BrcomponentComponent);
      }
    }      
  }

  GotoNextGeneration(){
    console.log("calculating next generation.");
   this.componentRefsList[0].instance.IsActive=false;
  
  }
}
