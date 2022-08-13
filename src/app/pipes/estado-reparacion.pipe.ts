import { Pipe, PipeTransform } from '@angular/core';

const shortMessage = {
  en_proceso: 'En proceso',
  cancelado_por_el_usuario: 'Cancelada',
}
const longMessage = {
  pendiente: 'Los tecnicos aun no revisaron este equipo',
  en_proceso: 'Los tecnicos comenzaron esta reparacion',
  cancelado_por_el_usuario: 'Cancelaste tu reparacion',
  reparado: 'Ya podes pasar a retirar tu equipo',
  sin_reparar: 'Los tecnicos no pudieron reparar tu equipo',
  diagnosticado: 'Ya tenemos el diagnostico de tu reparacion',
}


@Pipe({
  name: 'estadoReparacion'
})
export class EstadoReparacionPipe implements PipeTransform {

  transform(estado: string, ...args: string[]): unknown {
    if (args[0] && args[0] == 'short') {
      return shortMessage[estado] ? shortMessage[estado] : estado;
    } else {
      return longMessage[estado] ? longMessage[estado] : estado;
    }
  }

}
