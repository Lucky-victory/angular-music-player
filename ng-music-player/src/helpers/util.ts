export interface IUtils{
secondsToTime:(seconds:number)=> string;
}

export const Utils:IUtils={
secondsToTime(seconds){
    if(!seconds) return '00:00';
const add0=(num:number):string=>(num < 10 ? '0'+num :''+num);
const secondsInOneHour:number=3600;
const hour:number=Math.floor(seconds / secondsInOneHour );
const minute:number=Math.floor((seconds - hour * secondsInOneHour) / 60);
const sec=Math.floor(seconds - hour * secondsInOneHour - minute  * 60);

return (
    (hour > 0 ? [hour,minute,sec] : [minute,sec]).map(add0).join(':')
)
}
}