import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Utils } from 'src/helpers/util';
import { AppService } from '../app.service';
import { PlayerImageComponent } from '../player-image/player-image.component';
import { ISongList, RepeatState } from './player.type';

// @ViewChild('playerContainer')
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit,AfterViewInit{
  title = 'ng-music-player';

  songList: ISongList[] = [];
  isPlaying: boolean = false;
  song!: ISongList;
  songListImages!: ISongList['cover'][];
  currentIndex: number = 0;
  isRepeatAll: boolean = false;
  isShuffle: boolean = false;
  repeatIcon: string = 'repeat';
  progressPercent!: string;
  repeatState: RepeatState = 'repeat off';

  totalDuration!: string;
  timePlayed!: string;
  @ViewChild(PlayerImageComponent) playerImageComp!: PlayerImageComponent;
  private audio: HTMLAudioElement = new Audio();
  constructor(private service: AppService) {

    this.audio.addEventListener('ended', () => {
      this.onEnded();
    });
    this.audio.addEventListener('loadedmetadata', () => {
      this.loadMetadata();
    });
    this.audio.addEventListener('timeupdate', () => {
      this.timeUpdate();
    });
  }
  ngOnInit() {
        this.service.getSongs().subscribe((response) => {
      this.songList = response;
      this.song = this.songList[this.currentIndex];
      this.audio.src = this.song?.url;
      this.songListImages = this.songList.map((song) => song.cover);
        });
    
  }
  ngAfterViewInit() {
    this.playerImageComp.setPositionByIndex();
    this.playerImageComp.setSliderPosition();
  }
  minimizePlayer() {}
  showPlayList() {}
  onEnded() {
    if (this.isRepeatAll) {
      this.next();
    } else {
      this.pause();
    }
  }
  selectSongBySlide(type:string) {
    if (type == 'next') {
      this.next();
    }
    else{
this.previous()
    }
  }
  seek(event: MouseEvent | TouchEvent) {
    const target = event.currentTarget as HTMLElement;
    const { left: progressBarLeftOffset } = target.getBoundingClientRect();
    const { clientWidth } = target;
    const clientX: number = event.type.includes('mouse')
      ? (event as MouseEvent).clientX
      : (event as TouchEvent).changedTouches[0].clientX;
    // const offsetX:number=(clientX - progressBarLeftOffset);
    const { duration } = this.audio;
    const seekingPoint: number = (clientX / clientWidth) * duration;

    this.audio.currentTime = seekingPoint;
  }
  timeUpdate() {
    const { currentTime, duration } = this.audio;
    this.progressPercent = String((currentTime / duration) * 100) + '%';
    this.timePlayed = Utils.secondsToTime(currentTime);
    this.totalDuration = '- ' + Utils.secondsToTime(duration - currentTime);
  }
  loadMetadata() {
    const { duration } = this.audio;
    this.totalDuration = Utils.secondsToTime(duration);
  }
  repeat() {
    const isLoop: boolean = this.audio.loop;
    if (!isLoop && !this.isRepeatAll) {
      this.repeatIcon = 'repeat_one';
      this.repeatState = 'repeat one';
      this.audio.loop = true;
      this.isRepeatAll = false;
    } else if (!this.isRepeatAll && this.audio.loop) {
      this.audio.loop = false;
      this.isRepeatAll = true;
      this.repeatIcon = 'repeat';
      this.repeatState = 'repeat all';
    } else {
      this.isRepeatAll = false;
      this.repeatState = 'repeat off';
    }
  }
  shuffle() {
    this.isShuffle = !this.isShuffle;
  }

  playAndPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  play() {
    this.isPlaying = true;
    this.audio.play();
  }
  pause() {
    this.isPlaying = false;
    this.audio.pause();
  }
  next() {
    this.currentIndex++;
    if (this.currentIndex > this.songList.length - 1) {
      this.currentIndex = 0;
    }
    this.playerImageComp.setPositionByIndex();
    this.song = this.songList[this.currentIndex];
    this.audio.src = this.song.url;
    if (this.isPlaying) {
      
      this.play();
    }
  }
  previous() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songList.length - 1;
    }
     this.playerImageComp.setPositionByIndex();
    this.song = this.songList[this.currentIndex];
    this.audio.src = this.song.url;
   if (this.isPlaying) {
      
      this.play();
    }
  }
  toggleFavorite(evt: Event): void {
    const target = evt.currentTarget as HTMLElement;
    const { songId } = target.dataset;
    const singleSong = this.songList.find(
      (songItem) => String(songItem.id) == String(songId)
    );
    if (singleSong) {
      singleSong.favorite = !singleSong.favorite;
    }
  }
  
}
