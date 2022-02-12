import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  pure: false
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    var today = new Date();
    var past = new Date(value[0]);
    var diff: any = Math.abs(today.getTime() - past.getTime());
    const minutes = diff / (1000 * 60) % 60;
    const secs = diff / 1000;
    if (today.toLocaleDateString("en-US") !== past.toLocaleDateString("en-US")) return past.toLocaleDateString("en-US");
    if (secs < 6) return "beafore 5 secounds";
    if (secs > 5 && secs < 10800) return "beafore 7 miniutes";
    if (secs > 10800) return "beafore 3 hours";
    return;
  }

}
