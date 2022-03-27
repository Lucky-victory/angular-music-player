import { Component } from '@angular/core';
import { AppService } from './app.service';
import { ISongList } from './app.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-music-player';
  songList:ISongList[]=[];
  audio:HTMLAudioElement=new Audio('https://raw.githubusercontent.com/Lucky-victory/zplayer/master/songs/a-better-place-to-live.mp3');

  constructor(private service:AppService){
this.service.getSongs().subscribe(response =>{
  this.songList=response;
})
  }

  playSong(event:Event){
const src=event.target.dataset.src;


    this.audio.play();
    
  }
  pauseSong(){
    this.audio.pause();
  }

}
