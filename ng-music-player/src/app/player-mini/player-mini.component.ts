import { Component, Input, OnInit ,EventEmitter, Output} from '@angular/core';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-mini',
  templateUrl: './player-mini.component.html',
  styleUrls: ['./player-mini.component.css']
})
export class PlayerMiniComponent{
  @Input() currentSong!: ISongList;
  @Input() isPlaying!: boolean;
  @Input() isMinimized!: boolean;
  @Input() progressPercent!: string;
  @Output() onMiniPlayAndPause: EventEmitter<string> = new EventEmitter<string>();
  @Output() onExpand: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onMiniNext: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

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
  expandPlayer() {
    this.onExpand.emit(false);
  }
}
