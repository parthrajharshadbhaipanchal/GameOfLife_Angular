import { Routes } from '@angular/router';
import { GameoflifeComponent } from './components/gameoflife/gameoflife.component';

export const routes: Routes = [
    {path:'',redirectTo:"/gameoflife",pathMatch:'full'},
    {path:"gameoflife",component:GameoflifeComponent}
    
    
];
