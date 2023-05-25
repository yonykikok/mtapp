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
export enum roles {
  ADMIN = 'admin',
  CLIENTE = 'cliente',
  EMPLEADO = 'empleado',
  ST = 'st',
}
export interface Modulo {
  marca: string;
  modelo: string;
  precio: number;
  color: string;
  tipo: string;
  calidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfoCompartidaService {


  categoriasProductos = [];
  subCategoriasParlantes = ['3"', ''];

  subCatAuriculares = {
    subCatConexion: ['Con cable', 'Bluetooth'],
    subCatAgarre: ['Comunes', 'Con vincha'],
    subCatFunciones: ['Comunes', 'Manos libres'],
  }

  subCatCargadores = {
    subCatTipo: ['Celulares', 'Notebooks', 'Baterias', 'Otros'],
    subCatPotencia: ['Comunes', 'Carga rapida'],
    subCatConexion: ['Comunes', 'Tipo C', 'Iphone'],
  }


  marcasTrabajadas = ['Samsung', 'LG', 'Motorola', 'Huawei', 'Apple', 'Alcatel', 'Xiaomi', 'Sony', 'otro'];

  marcasModulos = ['Samsung', 'LG', 'Motorola', 'Huawei', 'Apple', 'Alcatel', 'Xiaomi', 'Sony'];
  calidadesModulos = ['AAA', 'GenMedCalidad', 'GenBueno', 'Estandar', 'Original Oled', 'Original Certificado'];
  coloresModulos = ['Blanco', 'Negro', 'Gris', 'Dorado', 'Celeste'];
  tiposModulos = ['Simple', 'C/M'];

  marcasTactiles = ['Samsung', 'LG', 'Otro'];
  coloresTactiles = ['Blanco', 'Negro', 'Gris', 'Plateado', 'Dorado', 'Celeste', 'Rosa'];
  tiposTactiles = ['Tablet', 'Celular'];

  marcasDisplay = ['Samsung', 'LG', 'Otro'];
  tiposDisplay = ['Tablet', 'Celular'];

  marcasBaterias = ['Samsung', 'LG', 'Motorola', 'Huawei', 'Apple', 'Alcatel', 'Xiaomi', 'Sony', 'otro'];
  calidadesBaterias = ['AAA', 'GenMedCalidad', 'GenBueno', 'Estandar', 'Original'];
  tiposBaterias = ['Tablet', 'Celular'];

  calidadesFlexDeCarga = ['AAA', 'Estandar', 'Original'];

  constructor(private database: DataBaseService) {
   
  }

}
