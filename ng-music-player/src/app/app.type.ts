

export interface ISongList{
    title:String;
   artist:string;
image:string;
url:string
}
export interface IApp{
    play:()=> void;
    pause:()=>void;
    playAndPause:()=>void;
    next:()=>void;
    previous:()=>void;
    repeat:()=>void;
    shuffle:()=>void;
    onEnded:()=>void;
}
export interface IRepeatState {
    REPEAT:string;
REPEAT_ONE:string;
REPEAT_OFF:string;

}