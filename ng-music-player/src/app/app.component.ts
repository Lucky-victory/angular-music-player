import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { ISongList } from './app.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-music-player';
  songList:ISongList[]=[];
  isPlaying:boolean=false;
  currentIndex:number=0;
  song:ISongList={
    title:'',
    artist: '',
    image: '',
    url: ''
  };
  audio:HTMLAudioElement=new Audio('https://raw.githubusercontent.com/Lucky-victory/zplayer/master/songs/a-better-place-to-live.mp3');

  constructor(private service:AppService){
  }
  ngOnInit(){
    this.service.getSongs().subscribe(response =>{
      this.songList=response;
    })
    
    this.song=this.songList[this.currentIndex];
    this.audio.src=this.song.url;
  }
playAndPauseSong():void{
  if(this.isPlaying){
this.pauseSong();
  }
  else{
    this.playSong();
  }

}
  playSong():void{
this.isPlaying=true;
    this.audio.play();
    
  }
  pauseSong():void{
    this.isPlaying=false;
    this.audio.pause();
  }
  nextSong():void{
    this.currentIndex++;
    this.song=this.songList[this.currentIndex];
this.audio.src=this.song.url;

  }
  prevSong():void{
    this.currentIndex--;
    this.song=this.songList[this.currentIndex];
    this.audio.src=this.song.url;

  }

}
