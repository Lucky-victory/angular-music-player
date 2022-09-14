import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerImageComponent } from './player-image.component';

describe('PlayerImageComponent', () => {
  let component: PlayerImageComponent;
  let fixture: ComponentFixture<PlayerImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
