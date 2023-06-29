import { Pipe, PipeTransform } from '@angular/core';
import { reparacionMessage, reparacionShortMessage } from '../services/info-compartida.service';
import { TitleCasePipe } from '@angular/common';





@Pipe({
  name: 'estadoReparacion'
})
export class EstadoReparacionPipe implements PipeTransform {

  transform(estado: string, ...args: string[]): unknown {
    if (args[0] && args[0] == 'short') {
      return reparacionShortMessage[estado.toUpperCase()] ? reparacionShortMessage[estado.toUpperCase()] : estado;
    } else {
      return reparacionMessage[estado.toUpperCase()] ? reparacionMessage[estado.toUpperCase()] : estado;
    }
  }

}
