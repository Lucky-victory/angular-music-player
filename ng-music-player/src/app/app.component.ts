import { Component} from '@angular/core';
import { Utils } from 'src/helpers/util';
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
 progressPercent!:string;
repeatState:IRepeatState={
  REPEAT:'repeat all',
  REPEAT_ONE:'repeat one',
  REPEAT_OFF:'repeat off'

};
st:string='';
totalDuration!:string;
timePlayed!:string;
  song:ISongList ={
    title:'',
    artist:'',
    url:'',
    image:''
  };
  private audio:HTMLAudioElement=new Audio();
  constructor(private service:AppService){
    this.service.getSongs().subscribe(response=>{
      this.songList=response;
      this.song=this.songList[this.currentIndex];
      this.audio.src=this.song.url;
    });
    this.st=-(this.currentIndex * 320)+'px';
    this.audio.addEventListener('ended',()=>{
      this.onEnded()
    });
    this.audio.addEventListener('loadedmetadata',()=>{
      this.loadMetadata();
    });
    this.audio.addEventListener('timeupdate',()=>{
      this.timeUpdate();
    })

}
onEnded(){
if(this.isRepeat){
  this.next();
}
else{
  this.pause();
}
}
seek(event:Event){
const target=event.currentTarget as HTMLElement;
console.log(target);

}
  timeUpdate():void{
    const {currentTime,duration}=this.audio;
this.progressPercent=String((currentTime / duration) * 100)+'%';
this.timePlayed=Utils.secondsToTime(currentTime);
this.totalDuration=Utils.secondsToTime(duration - currentTime);
  }
  loadMetadata():void{
const {duration}=this.audio;
this.totalDuration=Utils.secondsToTime(duration);
  }
  repeat():void{
    const isLoop:boolean=this.audio.loop;
    if(!isLoop && !this.isRepeat){
  this.repeatIcon='repeat_one';
  this.audio.loop=true;
  this.isRepeat=false;

}
else if(!this.isRepeat && this.audio.loop){
  this.audio.loop=false;
  this.isRepeat=true;
  this.repeatIcon='repeat';
}
else{
this.isRepeat=false;

}
  }
  shuffle():void{
this.isShuffle=!this.isShuffle;
  }

playAndPause():void{
  
  if(this.isPlaying){
this.pause();

  }
  else{
    this.play();
  }

}
  play():void{
   this.isPlaying=true;
    this.audio.play();
    
  }
  pause():void{
    this.isPlaying=false;
    this.audio.pause();
  }
  next():void{
    this.currentIndex++;
    if(this.currentIndex > this.songList.length -1){
      this.currentIndex=0;
    }
    this.song=this.songList[this.currentIndex];
this.audio.src=this.song.url;
this.play();
this.st=-(this.currentIndex * 320)+'px';


  }
  previous():void{
    this.currentIndex--;
    if(this.currentIndex < 0){
      this.currentIndex=this.songList.length -1;
    }
    this.song=this.songList[this.currentIndex];
    this.audio.src=this.song.url;
this.play();
this.st=-(this.currentIndex * 320)+'px'

  }

}
