import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { PlayerImageModule } from './player-image/player-image.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
  ],
  imports: [
    PlayerImageModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
