import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISongList } from '../interface/player.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  _url: string = '/assets/data.json';
  constructor(private http: HttpClient) {}
  getSongs(): Observable<ISongList[]> {
    return this.http.get<ISongList[]>(this._url);
  }
}
