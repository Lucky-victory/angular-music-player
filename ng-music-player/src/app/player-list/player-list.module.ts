import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerListComponent } from './player-list.component';



@NgModule({
  declarations: [
    PlayerListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlayerListComponent
  ]
})
export class PlayerListModule { }
