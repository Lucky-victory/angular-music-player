import { Component} from '@angular/core';
import { AppService } from './app.service';
import { IApp, ISongList, IRepeatState } from './app.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements IApp{
  title = 'ng-music-player';
  songList:ISongList[]=[];
  isPlaying:boolean=false;
  currentIndex:number=0;
  isRepeat:boolean=false;
isShuffle:boolean=false;
repeatIcon:string='repeat';
repeatState:IRepeatState={
  REPEAT:'repeat',
  REPEAT_ONE:'repeat one',
  REPEAT_OFF:'repeat off'

};

  song:ISongList ={
    title:'',
    artist:'',
    url:'',
    image:''
  };
  audio:HTMLAudioElement=new Audio();
isLoop:boolean=false;
  constructor(private service:AppService){
    this.service.getSongs().subscribe(response=>{
      this.songList=response;
      this.song=this.songList[this.currentIndex];
      this.audio.src=this.song.url;
    });
  
    this.audio.addEventListener('ended',()=>{
      this.nextSong()
    })
  }
  repeat():void{
    this.isLoop=true;
this.audio.loop=this.isLoop;
this.repeatIcon='repeat_one';
if(this.isLoop){
  this.audio.loop=false;
  this.isLoop=false;
  this.isRepeat=true;
}
if(this.isRepeat && !this.audio.loop){
  this.repeatIcon='repeat';
}
else{
this.isRepeat=false;

}
  }
  shuffle():void{
this.isShuffle=!this.isShuffle;
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
    if(this.currentIndex > this.songList.length -1){
      this.currentIndex=0;
    }
    this.song=this.songList[this.currentIndex];
this.audio.src=this.song.url;
this.playSong()

  }
  prevSong():void{
    this.currentIndex--;
    if(this.currentIndex < 0){
      this.currentIndex=this.songList.length -1;
    }
    this.song=this.songList[this.currentIndex];
    this.audio.src=this.song.url;
this.playSong();
  }

}
