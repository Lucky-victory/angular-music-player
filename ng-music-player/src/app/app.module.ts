import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { PlayerComponent } from './player/player.component';
import { PlayerImageModule } from './player-image/player-image.module';
import { PlayerMiniModule } from './player-mini/player-mini.module';
import { PlayerModule } from './player/player.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PlayerModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
