import { Pipe, PipeTransform } from '@angular/core';
import { boleta_estados, reparacionMessage, reparacionShortMessage } from '../services/info-compartida.service';
import { TitleCasePipe } from '@angular/common';





@Pipe({
  name: 'estadoReparacion'
})
export class EstadoReparacionPipe implements PipeTransform {

  transform(estado: boleta_estados, ...args: string[]): unknown {
    if (args[0] && args[0] == 'short') {
      return reparacionShortMessage[estado] ? reparacionShortMessage[estado] : estado;
    } else {
      return reparacionMessage[estado] ? reparacionMessage[estado] : estado;
    }
  }

}
