export interface IUtils{
    secondsToTime: (seconds: number) => string;
    randomOrder:(length:number)=>Array<number>
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
    },
      randomOrder(length:number) {
   function shuffle(arr:number[]) {
      for (let i = arr.length - 1; i >= 0; i--) {
         const r = Math.floor(Math.random() * (i + 1));
           [arr[i], arr[r]] = [arr[r], arr[i]]
      }
      return arr;
   }
   return shuffle([...Array(length)].map((item,i)=>i))
}
}