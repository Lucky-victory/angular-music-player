import { Component, OnInit,Input } from '@angular/core';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() songList: ISongList[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
