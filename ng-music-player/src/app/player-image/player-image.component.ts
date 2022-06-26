
import { Component,OnInit, Input, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Gesture, GestureController,GestureDetail } from '@ionic/angular';
import { ISongList } from '../player/player.type';

@Component({
  selector: 'app-player-image',
  templateUrl: './player-image.component.html',
  styleUrls: ['./player-image.component.css']
})
export class PlayerImageComponent implements OnInit,OnDestroy,AfterViewInit {
  @Input() songImages!: ISongList['cover'][];
  private gesture!: Gesture;
  private isHeld: boolean = false;
  @Input() currentIndex: number=0;
  currentTranslate: number = 0;
  @Output() onSlide: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('playerImageWrapper') playerImageWrapper!: ElementRef;
  @ViewChildren('playerImage', { read: ElementRef }) playerImage!: QueryList<ElementRef>;
  startPosition: number = 0;
  prevTranslate: number = 0;
  playerImagesArray!: Array<ElementRef>;
  constructor(private gestureCtrl:GestureController) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.createGesture();
    this.setPositionByIndex();
    this.setSliderPosition();
  }
  createGesture(): void{
    this.playerImagesArray = this.playerImage.toArray();
    for (let [index,playerImage] of this.playerImagesArray.entries()) {
      playerImage.nativeElement.querySelector('img').addEventListener('dragstart', (evt: MouseEvent) => evt.preventDefault());
      
      this.gesture = this.gestureCtrl.create({
        threshold: 10,
      el: playerImage.nativeElement,
      gestureName:'image-swipe',
        onEnd: (detail) => {
          this.isHeld = false;
          
          this.onSlideEnd(detail);
      },
        onStart: (detail) => {
          this.isHeld = true;
          this.onSlideStart(detail,index);
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
      const currentPosition = this.getPositionX(detail);
      this.currentTranslate = this.prevTranslate + currentPosition - this.startPosition;
      this.setSliderPosition();
      
    }
    
  }
  onSlideStart(detail:GestureDetail,index:number) {
    this.currentIndex = index;
    this.startPosition = this.getPositionX(detail);
    this.setSliderPosition();
    console.log(index);
    
  }
  onSlideEnd(detail: GestureDetail) {
    const movedBy: number = this.currentTranslate - this.prevTranslate;
    
    
    if (movedBy < -150 && this.currentIndex < this.playerImagesArray.length - 1) {
      this.currentIndex += 1;
      this.onSlide.emit('next');
      console.log('next');
    }
    if (movedBy > 150 && this.currentIndex > 0) {
      this.currentIndex -= 1;
      console.log('rev');
      this.onSlide.emit('prev');
      
    }
    this.setPositionByIndex();
  }
  ngOnDestroy():void {
    this.gesture.destroy();
  }
  setPositionByIndex() {
    this.currentTranslate = this.currentIndex * -300;
    this.prevTranslate = this.currentTranslate;
    this.setSliderPosition();
  }
  getPositionX(detail: GestureDetail) {
    return detail.deltaX;
  }
  setSliderPosition() {
    (this.playerImageWrapper.nativeElement as HTMLDivElement).style.transform = `translateX(${this.currentTranslate}px)`;
    (this.playerImageWrapper.nativeElement as HTMLDivElement).style.transition = '0.5s ease-in-out';
    
  }
}
