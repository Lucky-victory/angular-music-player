
import { Component,OnInit, Input, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Gesture, GestureController,GestureDetail } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
  isGrabbing: boolean = false;
  @Input() currentIndex: number=0;
  @Input() currentIndexSub!:BehaviorSubject<number>;
  currentTranslate: number = 0;
  @Output() onSlide: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('playerImagesContainer') playerImagesContainer!: ElementRef;
  @ViewChild('playerImageWrapper') playerImageWrapper!: ElementRef;
  
  @ViewChildren('playerImage', { read: ElementRef }) playerImage!: QueryList<ElementRef>;
  startPosition: number = 0;
  prevTranslate: number = 0;
  animationID!: number;
  playerImagesArray!: Array<ElementRef>;
  currentSlideElem!: HTMLElement;
  constructor(private gestureCtrl:GestureController) { }

  ngOnInit() {
    this.currentIndexSub.subscribe((index) => {
      this.currentIndex = index;
  })
  }
  ngAfterViewInit() {
    this.createGesture();
    
    this.setPositionByIndex();
    this.setSliderPosition();
  }
  private createGesture(): void{
    this.playerImagesArray = this.playerImage.toArray();
    for (let [index,playerImage] of this.playerImagesArray.entries()) {
      
      this.gesture = this.gestureCtrl.create({
        threshold: 10,
      el: playerImage.nativeElement,
      gestureName:'image-swipe',
        onEnd: (detail) => {
          this.isHeld = false;
          
          this.onSlideEnd();
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
  onSlideStart(detail: GestureDetail, index: number) {
    this.isGrabbing=true;
    this.currentIndex = index;
    this.startPosition = this.getPositionX(detail);
    this.setSliderPosition();
    this.animationID = requestAnimationFrame && requestAnimationFrame(() => {
      this.animation();
    })
  
    
  }
  onSlideEnd() {
    const movedBy: number = this.currentTranslate - this.prevTranslate;
    this.isGrabbing = false;
    
    if (movedBy < -150 && this.currentIndex < this.playerImagesArray.length - 1) {
      this.currentIndex += 1;
      this.onSlide.emit('next');
      
    }
    if (movedBy > 150 && this.currentIndex > 0) {
      this.currentIndex -= 1;
    
      this.onSlide.emit('prev');
      
    }
    this.setPositionByIndex();
    if (this.animationID) {
      
      cancelAnimationFrame(this.animationID);
    }
  }
  ngOnDestroy():void {
    this.gesture.destroy();
  }
  setPositionByIndex() {
    const playerImagesContainer = (this.playerImagesContainer.nativeElement as HTMLDivElement);
    console.log({
      off: playerImagesContainer.offsetWidth,
      cl: playerImagesContainer.clientWidth,
      sw:playerImagesContainer.scrollWidth
    });
    
    this.currentTranslate = this.currentIndex * (-this.playerImagesContainer.nativeElement.clientWidth );
    this.prevTranslate = this.currentTranslate;
    this.setSliderPosition();
  }
  getPositionX(detail: GestureDetail) {
    return detail.deltaX;
  }
  setSliderPosition() {
    (this.playerImageWrapper.nativeElement as HTMLDivElement).style.transform = `translateX(${this.currentTranslate}px)`;

    
  }
  animation() {
    this.setSliderPosition();
  }
  preventGhost(event:MouseEvent) {
    event.preventDefault();
  }
}
