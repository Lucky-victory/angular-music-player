import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerImageModule } from '../player-image/player-image.module';
import { PlayerMiniModule } from '../player-mini/player-mini.module';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,  PlayerImageModule,
    PlayerMiniModule,
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
