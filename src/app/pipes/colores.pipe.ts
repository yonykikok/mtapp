import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colores'
})
export class ColoresPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value.toLowerCase()) {
      case 'blanco':
        return 'white';
      case 'negro':
        return 'black';
      case 'gris':
        return 'gray';
      case 'plateado':
        return 'silver';
      case 'dorado':
        return 'gold';
      case 'celeste':
        return 'lightblue';
      case 'rosa':
        return 'pink';
      default:
        return 'blanco'
          ;
    }
  }

}
