

export interface ISongList{
    id:(string | number);
    title:string;
   artist:string;
cover:string;
url:string,
favorite:boolean
}
export interface IPlayer{
    songList:ISongList[];
  isPlaying:boolean;
  song:ISongList;
   currentIndex:number;
  isRepeatAll:boolean;
isShuffle:boolean;
repeatIcon:string;
 progressPercent:string;
repeatState:RepeatState;
totalDuration:string;
timePlayed:string;
    play:()=> void;
    pause:()=>void;
    playAndPause:()=>void;
    next:()=>void;
    previous:()=>void;
    repeat:()=>void;
    shuffle:()=>void;
    onEnded:()=>void;
    toggleFavorite:(evt:Event)=>void;
}
export type RepeatState = 'repeat one'|'repeat all'|'repeat off';
    