import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
playlist:ISongList[]=[]
  constructor(private service:AppService) { 
    this.service.getSongs().subscribe(response=>{
this.playlist=response;
    })
  }

  ngOnInit(): void {
  }

}
