import { Component, Input, OnInit } from '@angular/core';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-mini',
  templateUrl: './player-mini.component.html',
  styleUrls: ['./player-mini.component.css']
})
export class PlayerMiniComponent implements OnInit {
  @Input() currentSong!: ISongList;
  @Input() isPlaying!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
