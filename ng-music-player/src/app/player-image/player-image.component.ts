
import { Component, Input, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit, ViewChild } from '@angular/core';
import { Gesture, GestureController,GestureDetail } from '@ionic/angular';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-image',
  templateUrl: './player-image.component.html',
  styleUrls: ['./player-image.component.css']
})
export class PlayerImageComponent implements OnDestroy,AfterViewInit {
  @Input() songImages!: ISongList['cover'][];
  private gesture!: Gesture;
  private isHeld: boolean = false;
  // @ViewChild('playerImageWrapper') playerImageWrapper!: ElementRef;
  @ViewChildren('playerImage', { read: ElementRef }) playerImage!: QueryList<ElementRef>;
  constructor(private gestureCtrl:GestureController) { }

 
  ngAfterViewInit() {
    this.createGesture();
  }
  createGesture(): void{
    const playerImagesArray = this.playerImage.toArray();
    for (let playerImage of playerImagesArray) {
      
      this.gesture = this.gestureCtrl.create({
        threshold: 0,
      el: playerImage.nativeElement,
      gestureName:'image-swipe',
        onEnd: (detail) => {
          this.isHeld = false;
          
          this.onSlideEnd(detail);
      },
        onStart: (detail) => {
          this.isHeld = true;
          this.onSlideStart(detail);
      },
      onMove: (detail) => {
        this.onSlideMove(detail);
      }
    }, true);
    this.gesture.enable();
  }
  }
  onSlideMove(detail: GestureDetail) {
    if (this.isHeld) {
      // (this.playerImageWrapper.nativeElement as HTMLDivElement).style.transform=`translatex(${detail.currentX}px)`
      const positions = {
        x: detail.currentX,
        
      }
      console.log(detail,'in');
    }
    
  }
  onSlideStart(detail:GestureDetail) {
    
    console.log(detail);
  }
  onSlideEnd(detail:GestureDetail) {
    
  }
  ngOnDestroy():void {
    this.gesture.destroy();
  }
}
