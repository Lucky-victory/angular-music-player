import { Component, Input, OnInit ,EventEmitter, Output} from '@angular/core';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-mini',
  templateUrl: './player-mini.component.html',
  styleUrls: ['./player-mini.component.css']
})
export class PlayerMiniComponent implements OnInit {
  @Input() currentSong!: ISongList;
  @Input() isPlaying!: boolean;
  @Output() onMiniPlayAndPause: EventEmitter<string> = new EventEmitter<string>();
  @Output() onMiniNext: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  playAndPause() {
    if (this.isPlaying) {
      
      this.onMiniPlayAndPause.emit('pause');
      return
    }
    this.onMiniPlayAndPause.emit('play')
  }
  nextSong() {
    this.onMiniNext.emit();
  }
}
