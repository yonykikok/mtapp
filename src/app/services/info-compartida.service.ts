import { Injectable } from '@angular/core';
import { DataBaseService } from '../services/database.service';


export enum boleta_estados {
  pendiente = 'pendiente',
  en_proceso = 'en_proceso',
  cancelado_por_el_usuario = 'cancelado_por_el_usuario',
  reparado = 'reparado',
  sin_reparar = 'sin_reparar',
  diagnosticado = 'diagnosticado'
}
export enum reparacionMessage {
  pendiente = 'Pendiente',
  en_proceso = 'En proceso',
  cancelado_por_el_usuario = 'Cancelaste la reparacion',
  reparado = 'Terminada',
  sin_reparar = 'No se pudo reparar',
  diagnosticado = 'Diagnostico listo'
}
export enum reparacionBgColor {
  en_proceso = 'blue',
  pendiente = 'lightskyblue',
  reparado = 'green',
  cancelado_por_el_usuario = 'red',
  sin_reparar = 'red',
  diagnosticado = 'orange'
}
export enum reparacionIconName {
  pendiente = 'stopwatch-outline',
  en_proceso = 'construct-outline',
  cancelado_por_el_usuario = 'close-circle-outline',
  reparado = 'checkmark-done-circle-outline',
  sin_reparar = 'thumbs-down-outline',
  diagnosticado = 'alert-circle-outline'
}





@Injectable({
  providedIn: 'root'
})
export class InfoCompartidaService {

  constructor() { }

}
