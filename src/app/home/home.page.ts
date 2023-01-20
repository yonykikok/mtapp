import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  reparaciones;
  reparacionesAMostrar
  modulos = [
    // { titulo: 'Modulos', color: '#28a745', ruta: "/listaModulos", role: 'CLIENTE' },
    // { titulo: 'Tactiles', color: '#42688a', ruta: "/listaTactiles", role: 'CLIENTE' },
    // { titulo: 'Baterias', color: '#ffc107', ruta: "/listaBaterias", role: 'CLIENTE' },
    // { titulo: 'Display', color: '#238386', ruta: "/listaDisplays", role: 'CLIENTE' },
    // { titulo: 'Flex de carga', color: '#d34fb2', ruta: "/listaFlexDeCarga", role: 'CLIENTE' },
    // { titulo: 'Pedidos', color: '#007bff', ruta: "/listaPedidos", role: 'ADMIN' },
    // { titulo: 'Deudores', color: '#dc3545', ruta: "/deudores", role: 'ADMIN' },
    // { titulo: 'Ventas', color: '#7fbdc7', ruta: "/equiposVendidos", role: 'ADMIN' },
    // { titulo: 'Libro diario', color: '#dc70fd', ruta: "/libroDiario", role: 'ADMIN' },
    // { titulo: 'Historial', color: 'rgb(113 112 253)', ruta: "/historialCaja", role: 'ADMIN' },
    // { titulo: 'Mis reparaciones', color: '#d34fb2', ruta: "/misReparaciones", role: 'CLIENTE' },
  ]

  constructor() {
  }

 
}

