import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ISongList } from '../interface/player.interface';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  @Input() songList: ISongList[] = [];
  currentIndex!: number;
  @Output() onPlayListSelect: EventEmitter<number> = new EventEmitter<number>();
  @Input() canShowPlaylist!: boolean;
  @Output() onHidePlayList: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() currentIndex$!: BehaviorSubject<number>;
  moveItemInArray = moveItemInArray;
  constructor() {}

  ngOnInit(): void {
    this.currentIndex$.subscribe((index) => {
      this.currentIndex = index;
    });
  }
  setAsCurrent(index: number) {
    this.currentIndex = index;
    this.onPlayListSelect.emit(index);
  }
  hidePlayList() {
    this.onHidePlayList.emit(false);
  }
  drop(event: CdkDragDrop<ISongList[]>) {
    moveItemInArray(this.songList, event.previousIndex, event.currentIndex);
  }
}
