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

  
  @Output() public componentRefsList: ComponentRef<CellComponent>[][] = [];
  @Input() public matrixSize: number = 0;
  @ViewChild('matrixContainer', { read: ViewContainerRef }) container!: ViewContainerRef;

  nextGenerationStatusList: boolean[][] = [];
  timer:any;

  constructor() { }

  public StartTimer(){
    this.timer=setInterval(this.GotoNextGeneration,1000);
  }

  StopTimer(){
    clearInterval(this.timer);
  }

  ngOnChanges() {
    this.CreateNewCellMatrix();
  }

  CreateNewCellMatrix(){
    for (let i = 1; i <= this.matrixSize; i++) {
      let componentArray: ComponentRef<CellComponent>[] = [];
      let booleanArray:boolean[]=[];
      for (let j = 1; j <= this.matrixSize; j++) {
        let component = this.container.createComponent(CellComponent);
        component.instance.DivisionId = i;

        componentArray.push(component);
        booleanArray.push(false);

        //add line break component
        if ((i + j - 1) % this.matrixSize == 0) {
          this.container.createComponent(BrcomponentComponent);
        }
      }
      this.componentRefsList.push(componentArray);
      this.nextGenerationStatusList.push(booleanArray);
    }
  }

  GotoNextGeneration() {
    this.CalculateNextGenerationForMatrix();
    this.ApplyNextGenerationState();
  }

  ApplyNextGenerationState() {
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        this.componentRefsList[i][j].instance.IsActive = this.nextGenerationStatusList[i][j];
      }
    }
  }

  CalculateNextGenerationForMatrix() {   
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        this.nextGenerationStatusList[i][j] = this.GetNextStateOfCell(i, j);
      }
    }
  }

  GetNextStateOfCell(i: number, j: number): boolean {
    let aliveCell: boolean[] = [];
    let nextState: boolean = false;

    if (i > 0 && j > 0) {
      //Top Left Cell    
      aliveCell.push(this.componentRefsList[i - 1][j - 1].instance.IsActive);
    }
    else {
      aliveCell.push(false);
    }

    if (j > 0) {
      //Top center cell
      aliveCell.push(this.componentRefsList[i][j - 1].instance.IsActive);
    }
    else {
      aliveCell.push(false);
    }

    if (i < this.matrixSize - 1 && j > 0) {
      //Top right cell
      aliveCell.push(this.componentRefsList[i + 1][j - 1].instance.IsActive);
    }
    else {
      aliveCell.push(false);
    }

    if (i > 0) {
      //Mid Left cell
      aliveCell.push(this.componentRefsList[i - 1][j].instance.IsActive);
    } else {
      aliveCell.push(false);
    }

    if (i < this.matrixSize - 1) {
      //Mid Right cell
      aliveCell.push(this.componentRefsList[i + 1][j].instance.IsActive);
    } else {
      aliveCell.push(false);
    }

    if (j < this.matrixSize - 1 && i > 0) {

      //Lower Left Cell
      aliveCell.push(this.componentRefsList[i - 1][j + 1].instance.IsActive);
    } else {
      aliveCell.push(false);
    }

    if (j < this.matrixSize - 1) {
      //Lower center cell
      aliveCell.push(this.componentRefsList[i][j + 1].instance.IsActive);
    } else {
      aliveCell.push(false);
    }

    if (j < this.matrixSize - 1 && i < this.matrixSize - 1) {
      //Lower right cell
      aliveCell.push(this.componentRefsList[i + 1][j + 1].instance.IsActive);
    }
    else {
      aliveCell.push(false);
    }


    let totalAliveCells: number = aliveCell.filter(x => x).length;

    if (this.componentRefsList[i][j].instance.IsActive) {
      if (totalAliveCells==2 || totalAliveCells==3) {
        nextState = true;
      }
      else {
        nextState = false;
      }
    } else {
      nextState = (totalAliveCells == 3);
    }

    return nextState;
  }

}
