import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(value: any[], separator: string = ', '): string {
    if (!value) return '';
    return value.join(separator);
  }
}
