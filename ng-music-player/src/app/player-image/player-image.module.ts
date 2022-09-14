import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerImageComponent } from './player-image.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PlayerImageComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PlayerImageComponent
  ]
})
export class PlayerImageModule { }
