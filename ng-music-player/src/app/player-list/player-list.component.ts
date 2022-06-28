import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  @Input() songList: ISongList[] = [];
  currentIndex!: number;
  @Output() onPlayListSelect: EventEmitter<number> = new EventEmitter<number>();
  @Input() canShowPlaylist!: boolean;
  @Output() onHidePlayList: EventEmitter<boolean> = new EventEmitter<boolean>();
@Input() currentIndex$!:BehaviorSubject<number>
  constructor() { }

  ngOnInit(): void {
    this.currentIndex$.subscribe((index) => {
      this.currentIndex = index;
    })
  }
  setAsCurrent(index: number) {
    
    this.onPlayListSelect.emit(index);
  }
   hidePlayList() {
     this.onHidePlayList.emit(false);
  }
}
