import { Injectable } from '@angular/core';
import { DataBaseService } from '../services/database.service';
export const listaDeEstadosBoletas = [
  { variable: 'PENDIENTE', mensaje: 'Pendiente' },
  { variable: 'EN_REVISION', mensaje: 'En revision' },
  { variable: 'CANCELADO_POR_EL_USUARIO', mensaje: 'Cancelado por el usuario' },
  { variable: 'EN_PROCESO', mensaje: 'En proceso' },
  { variable: 'ESPERADO_RESPUESTA', mensaje: 'Esperado respuesta' },
  { variable: 'PAUSADO', mensaje: 'Pausado' },
  { variable: 'NO_REPARADO', mensaje: 'No reparado' },
  { variable: 'REPARADO', mensaje: 'Reparado' },
  { variable: 'PARA_NOTIFICAR', mensaje: 'Para notificar' },
  { variable: 'PARA_ENTREGAR', mensaje: 'Para entregar' },
  { variable: 'RETIRADO', mensaje: 'Retirado' },
];


export enum boleta_estados {
  PENDIENTE = 'PENDIENTE', // Recién ingresa.
  EN_REVISION = 'EN_REVISION', // Se comenzó el diagnóstico.
  CANCELADO_POR_EL_USUARIO = 'CANCELADO_POR_EL_USUARIO', // El usuario cancela por X motivo.
  EN_PROCESO = 'EN_PROCESO', // Se comenzó la reparación.
  ESPERADO_RESPUESTA = 'ESPERADO_RESPUESTA', // Se notificó y esperamos respuesta.
  PAUSADO = 'PAUSADO', // Se pausó por falta de repuesto o algún motivo.
  NO_REPARADO = 'NO_REPARADO', // No se pudo reparar o no vamos a repararlo por X motivo.
  REPARADO = 'REPARADO', // Se finalizó la reparación.
  PARA_NOTIFICAR = 'PARA_NOTIFICAR', // Se debe notificar al usuario el estado del equipo.
  PARA_ENTREGAR = 'PARA_ENTREGAR', // Reparado y notificado, estando listo para entregar.
  RETIRADO = 'RETIRADO', // El usuario ya tiene su dispositivo.
}
export enum reparacionShortMessage {
  PENDIENTE = 'Pendiente',
  EN_REVISION = 'En revision',
  CANCELADO_POR_EL_USUARIO = 'Cancelado por el usuario',
  EN_PROCESO = 'En proceso',
  ESPERADO_RESPUESTA = 'Esperado respuesta',
  PAUSADO = 'Pausado',
  NO_REPARADO = 'No reparado',
  REPARADO = 'Reparado',
  PARA_NOTIFICAR = 'Para notificar',
  PARA_ENTREGAR = 'Para entregar',
  RETIRADO = 'Retirado',
}

export enum reparacionMessage {
  PENDIENTE = 'Los técnicos aún no han revisado este equipo',
  EN_REVISION = 'Los técnicos están revisando este equipo',
  CANCELADO_POR_EL_USUARIO = 'Reparación cancelada por el cliente',
  EN_PROCESO = 'El equipo está en proceso de reparación',
  ESPERADO_RESPUESTA = 'Los técnicos están esperando respuesta del cliente',
  PAUSADO = 'Se tuvo que pausar la reparación',
  NO_REPARADO = 'El equipo no se pudo reparar',
  REPARADO = 'El equipo ya está reparado',
  PARA_NOTIFICAR = 'Reparación lista para notificar al cliente',
  PARA_ENTREGAR = 'Reparación lista para entregar al cliente',
  RETIRADO = 'Reparación retirada por el cliente'
}
export enum reparacionBgColor {
  PENDIENTE = "#FFAA57",
  EN_REVISION = "#17A2B8",
  CANCELADO_POR_EL_USUARIO = "#6C757D",
  EN_PROCESO = "#28A745",
  ESPERADO_RESPUESTA = "#BA55D3",
  PAUSADO = "#6C757D",
  NO_REPARADO = "#DC3545",
  REPARADO = "#228B22",
  PARA_NOTIFICAR = "#FF69B4",
  PARA_ENTREGAR = "#007BFF",
  RETIRADO = "#343A40",
}
export enum reparacionIconName {
  PENDIENTE = 'hourglass',
  EN_REVISION = 'search',
  CANCELADO_POR_EL_USUARIO = 'close',
  EN_PROCESO = 'construct',
  ESPERADO_RESPUESTA = 'chatbubbles',
  PAUSADO = 'pause',
  NO_REPARADO = 'warning',
  REPARADO = 'checkmark',
  PARA_NOTIFICAR = 'notifications',
  PARA_ENTREGAR = 'cube',
  RETIRADO = 'exit',
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