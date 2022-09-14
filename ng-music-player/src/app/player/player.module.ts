import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerImageModule } from '../player-image/player-image.module';
import { PlayerMiniModule } from '../player-mini/player-mini.module';
import { PlayerListModule } from '../player-list/player-list.module';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,  PlayerImageModule,
    PlayerMiniModule,PlayerListModule
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
