import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerListComponent } from './player-list.component';

import {DragDropModule} from '@angular/cdk/drag-drop'
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    PlayerListComponent
  ],
  imports: [
    CommonModule,DragDropModule,IonicModule
  ],
  exports: [
    PlayerListComponent
  ]
})
export class PlayerListModule { }
