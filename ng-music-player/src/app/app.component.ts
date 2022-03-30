import { Component} from '@angular/core';
import { AppService } from './app.service';
import { IApp, ISongList } from './app.type';

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
  song:ISongList ={
    title:'',
    artist:'',
    url:'',
    image:''
  };
  audio:HTMLAudioElement=new Audio();

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

  }
  shuffle():void{

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
