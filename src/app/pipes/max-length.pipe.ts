import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(texto: string, ...args: number[]): unknown {
    if (texto.length > args[0]) {
      texto = texto.substring(0, (args[0]-3));
      texto += '...';
    }
    return texto;
  }

}
