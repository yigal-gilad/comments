import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    var today = new Date();
    var past = new Date(value);
    var diff: any = Math.abs(today.getTime() - today.getTime());
    const minutes = diff / (1000 * 60) % 60;
    const secs = diff / 1000;
    console.log(minutes);
    if (past.getFullYear() !== today.getFullYear() || past.getMonth() !== today.getMonth() || minutes > 180) return past.toLocaleDateString("en-US");
    if (minutes === 0 && secs < 5) return "beafore 5 secounds"
    if (minutes > 7) return "beafore 3 hours";
    if (minutes <= 7) return "beafore 7 miniutes";
    return;
  }

}
