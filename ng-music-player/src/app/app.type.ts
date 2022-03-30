

export interface ISongList{
    title:String;
   artist:string;
image:string;
url:string
}
export interface IApp{
    playSong:()=> void;
    pauseSong:()=>void;
    playAndPauseSong:()=>void;
    nextSong:()=>void;
    prevSong:()=>void;
    repeat:()=>void;
    shuffle:()=>void;
}
export interface IRepeatState {
    REPEAT:string;
REPEAT_ONE:string;
REPEAT_OFF:string;

}