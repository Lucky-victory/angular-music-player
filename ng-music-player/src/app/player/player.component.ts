import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/helpers/util';
import { AppService } from '../app.service';
import { IPlayer, ISongList, RepeatState } from './player.type';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements IPlayer{

    title = 'ng-music-player';
    songList:ISongList[]=[];
    isPlaying:boolean=false;
    song:ISongList={
      artist:'',
      title:'',
      url:'',
      cover:'',
      id:'',
      favorite:false
    };
     currentIndex:number=0;
    isRepeatAll:boolean=false;
  isShuffle:boolean=false;
  repeatIcon:string='repeat';
   progressPercent!:string;
  repeatState:RepeatState='repeat off';
  
  totalDuration!:string;
  timePlayed!:string;
    private audio:HTMLAudioElement=new Audio();
    constructor(private service:AppService){
      this.service.getSongs().subscribe(response=>{
        
        this.songList=response;
        this.song=this.songList[this.currentIndex];
        this.audio.src=this.song.url;
      });
      
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
  if(this.isRepeatAll){
    this.next();
  }
  else{
    this.pause();
  }
  }
  seek(event:(MouseEvent | TouchEvent)){
  const target=event.currentTarget as HTMLElement;
  const {left:progressBarLeftOffset}=target.getBoundingClientRect();
  const {clientWidth}=target;
  const clientX:number=event.type.includes('mouse') ? (event as MouseEvent).clientX : (event as TouchEvent).changedTouches[0].clientX;
  // const offsetX:number=(clientX - progressBarLeftOffset);
  const {duration}=this.audio;
  const seekingPoint:number=(clientX/clientWidth) * duration;
  
  
  this.audio.currentTime=seekingPoint;
  
  }
    timeUpdate(){
      const {currentTime,duration}=this.audio;
  this.progressPercent=String((currentTime / duration) * 100)+'%';
  this.timePlayed=Utils.secondsToTime(currentTime);
  this.totalDuration='- '+Utils.secondsToTime(duration - currentTime);
    }
    loadMetadata(){
  const {duration}=this.audio;
  this.totalDuration=Utils.secondsToTime(duration);
    }
    repeat(){
      const isLoop:boolean=this.audio.loop;
      if(!isLoop && !this.isRepeatAll){
    this.repeatIcon='repeat_one';
    this.repeatState='repeat one';
    this.audio.loop=true;
    this.isRepeatAll=false;
  
  }
  else if(!this.isRepeatAll && this.audio.loop){
    this.audio.loop=false;
    this.isRepeatAll=true;
    this.repeatIcon='repeat';
    this.repeatState='repeat all';
  }
  else{
  this.isRepeatAll=false;
  this.repeatState='repeat off';
  }
    }
    shuffle(){
  this.isShuffle=!this.isShuffle;
    }
  
  playAndPause(){
    
    if(this.isPlaying){
  this.pause();
  
    }
    else{
      this.play();
    }
  
  }
    play(){
     this.isPlaying=true;
      this.audio.play();
      
    }
    pause(){
      this.isPlaying=false;
      this.audio.pause();
    }
    next(){
      this.currentIndex++;
      if(this.currentIndex > this.songList.length -1){
        this.currentIndex=0;
      }
      this.song=this.songList[this.currentIndex];
  this.audio.src=this.song.url;
  this.play();
  
  
  
    }
    previous(){
      this.currentIndex--;
      if(this.currentIndex < 0){
        this.currentIndex=this.songList.length -1;
      }
      this.song=this.songList[this.currentIndex];
      this.audio.src=this.song.url;
  this.play();
  
    }
    toggleFavorite(evt:Event):void{
  const target=evt.currentTarget as HTMLElement;
  const {songId}=target.dataset;
  const singleSong=this.songList.find((songItem)=> String(songItem.id) == String(songId));
  if(singleSong){
    singleSong.favorite = !singleSong.favorite;
  }
  
    }
  
  }
  