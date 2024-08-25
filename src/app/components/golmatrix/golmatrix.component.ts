import { Component, EventEmitter, ComponentRef, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CellComponent } from './cell/cell.component';
import { BrcomponentComponent } from '../brcomponent/brcomponent.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-golmatrix',
  standalone: true,
  imports: [BrcomponentComponent,CommonModule,FormsModule],
  templateUrl: './golmatrix.component.html',
  styleUrl: './golmatrix.component.css'
})
export class GolmatrixComponent {

  
  @Output() public componentRefsList: ComponentRef<CellComponent>[][] = [];
  @Input() public matrixSize: number = 0;
  @ViewChild('matrixContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  public AnimationSpeed:number=0;
  public AnimationState:boolean=false;

  nextGenerationStatusList: boolean[][] = [];
  timer:any;

  gliderPattern:number[][]=[
    [0,1,2,2,2],
    [1,2,0,1,2]
  ];

  pulsarPattern:number[][]=[
    [4,4,4, 4, 4, 4, 6,6, 6, 6, 7,7, 7, 7, 8,8, 8, 8, 9,9,9, 9, 9, 9, 11,11,11,11,11,11, 12,12,12,12, 13,13,13,13, 14,14,14,14, 16,16,16,16,16,16],

//    [2,3,4,8,9,10,0,5,7,12,0,5,7,12,0,5,7,12,2,3,4,8,9,10,2,3,4,8,9,10, 0, 5, 7,12, 0, 5, 7,12, 0, 5, 7,12, 2, 3, 4, 8, 9,10]
    [6,7,8,12,13,14, 4,9,11,16, 4,9,11,16, 4,9,11,16, 6,7,8,12,13,14,  6, 7, 8,12,13,14,  4, 9,11,16,  4, 9,11,16,  4, 9,11, 16,  6,7, 8,12,13,14]

  ];

  constructor() { }

  public AnimationPaceChanged(){
    this.StopTimer();
    this.StartTimer();    
  }

  public StartTimer(){    
    if(null!=this.timer){
      clearInterval(this.timer);
      this.AnimationState=false;
    }
    this.timer=setInterval(()=>this.GotoNextGeneration(),((1/this.AnimationSpeed)*1000));    
    this.AnimationState=true;
  }
  
  public StopTimer(){
    if(null!=this.timer){
      clearInterval(this.timer);
      this.AnimationState=false;
    }
  }

  public ngOnChanges() {
    this.CreateNewCellMatrixOrReset();
  }

  public CreateNewCellMatrixOrReset(){
    this.componentRefsList=[];
    this.nextGenerationStatusList=[];
    this.container?.clear();
    this.AnimationState=false;
    for (let i = 1; i <= this.matrixSize; i++) {
      let componentArray: ComponentRef<CellComponent>[] = [];
      let booleanArray:boolean[]=[];
      for (let j = 1; j <= this.matrixSize; j++) {
        let component = this.container.createComponent(CellComponent);
        component.instance.DivisionId = i;

        componentArray.push(component);
        booleanArray.push(false);

        //add line break component
        if ((i + j -1) % this.matrixSize <= 0) {
          this.container.createComponent(BrcomponentComponent);
        }
      }
      this.componentRefsList.push(componentArray);
      this.nextGenerationStatusList.push(booleanArray);
    }
  }

  public GotoNextGeneration() {
    this.CalculateNextGenerationForMatrix();
    this.ApplyNextGenerationState();
  }

  public AddGliderPattern(){
    for(let index=0;index<this.gliderPattern[0].length;index++){
      this.componentRefsList[this.gliderPattern[0][index]][this.gliderPattern[1][index]].instance.IsActive=true;
    }
  }

  public AddPulsarPattern(){
    for(let index=0;index<this.pulsarPattern[0].length;index++){
      this.componentRefsList[this.pulsarPattern[0][index]][this.pulsarPattern[1][index]].instance.IsActive=true;
    }
  }

  public AddRandomCells(){

  }

  private ApplyNextGenerationState() {
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        this.componentRefsList[i][j].instance.IsActive = this.nextGenerationStatusList[i][j];
      }
    }
  }

  private CalculateNextGenerationForMatrix() {   
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        this.nextGenerationStatusList[i][j] = this.GetNextStateOfCell(i, j);
      }
    }
  }

  private GetNextStateOfCell(i: number, j: number): boolean {
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
