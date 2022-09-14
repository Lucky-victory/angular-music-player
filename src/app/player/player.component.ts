import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Utils } from 'src/helpers/util';
import { AppService } from '../services/app.service';
import { PlayerImageComponent } from '../player-image/player-image.component';
import { ISongList, RepeatState } from '../interface/player.interface';

// @ViewChild('playerContainer')
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit, AfterViewInit {
  songList: ISongList[] = [];
  isPlaying: boolean = false;
  currentSong!: ISongList;
  songListImages!: ISongList['cover'][];
  currentIndex: number = 0;
  currentIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.currentIndex
  );
  isRepeatAll: boolean = false;
  isShuffle: boolean = false;
  repeatIcon: string = 'repeat';
  progressPercent!: string;
  repeatState: RepeatState = 'repeat off';
  isMinimized: boolean = false;
  canShowPlaylist: boolean = false;
  totalDuration!: string;
  timePlayed!: string;
  @ViewChild(PlayerImageComponent) playerImageComp!: PlayerImageComponent;
  @ViewChild('progressBar') progressBar!: ElementRef;
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
    this.service.getSongs().subscribe((songs) => {
      this.songList = songs;
      this.setCurrentSong();
      this.songListImages = this.songList.map((song) => song.cover);
    });
  }
  setCurrentSong() {
    this.currentSong = this.songList[this.currentIndex];
    this.audio.src = this.currentSong?.url;
  }
  ngAfterViewInit() {
    this.playerImageComp.setPositionByIndex();
    // this.playerImageComp.setSliderPosition();
  }
  minimizePlayer() {
    this.isMinimized = !this.isMinimized;
  }
  expandPlayer(isMinimized: boolean) {
    this.isMinimized = isMinimized;
    setTimeout(() => {
      this.playerImageComp.setPositionByIndex();
    }, 100);
  }
  playListSelect(index: number) {
    this.currentIndex = index;
    this.currentIndexSubject.next(index);
    this.setCurrentSong();
    this.playerImageComp.setPositionByIndex();
    this.delayPlay();
  }
  delayPlay() {
    if (this.isPlaying) {
      this.pause();
      setTimeout(() => {
        this.play();
      }, 10);
    }
  }
  showPlayList() {
    this.canShowPlaylist = !this.canShowPlaylist;
  }
  onEnded() {
    if (this.isRepeatAll) {
      this.next();
    } else {
      this.pause();
    }
  }
  selectSongBySlide(type: string) {
    this.isShuffle = false;
    if (type == 'next') {
      this.next();
    } else {
      this.previous();
    }
  }
  seek(event: MouseEvent | TouchEvent) {
    const target = this.progressBar.nativeElement as HTMLElement;
    const { clientWidth } = target;

    const clientX: number = (event as MouseEvent).clientX;

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
    this.timeUpdate();
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
    if (this.isShuffle) {
      this.randomSong();
      return;
    }
    this.currentIndex++;
    if (this.currentIndex > this.songList.length - 1) {
      this.currentIndex = 0;
    }
    this.currentIndexSubject.next(this.currentIndex);
    this.playerImageComp.setPositionByIndex();
    this.setCurrentSong();
    this.delayPlay();
  }
  previous() {
    if (this.isShuffle) {
      this.randomSong();
      return;
    }
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songList.length - 1;
    }
    this.currentIndexSubject.next(this.currentIndex);
    this.playerImageComp.setPositionByIndex();
    this.setCurrentSong();
    this.delayPlay();
  }
  randomSong() {
    this.currentIndex = Utils.randomOrder(this.songList.length)[0];
    this.currentIndexSubject.next(this.currentIndex);
    this.setCurrentSong();
    this.playerImageComp.setPositionByIndex();
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
