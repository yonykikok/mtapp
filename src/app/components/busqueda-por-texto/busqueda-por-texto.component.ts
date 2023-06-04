import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda-por-texto',
  templateUrl: './busqueda-por-texto.component.html',
  styleUrls: ['./busqueda-por-texto.component.scss'],
})
export class BusquedaPorTextoComponent implements OnInit {
  textoABuscar="";
  mesSeleccionado;
  itemsFiltrados;
  mostrarBuscador;
  itemSeleccionado;
  constructor() { }

  ngOnInit() {
    this.applyFilter();
  }


  applyFilter() {
    let items = [];

    this.mesSeleccionado.dias.forEach(dia => {
      dia.ventas.forEach(venta => {
        if (venta.descripcion.toLowerCase().includes(this.textoABuscar.toLowerCase()) ||
          venta.boleta == this.textoABuscar) {
          let auxVenta = { ...venta };
          auxVenta['fecha'] = dia.fecha;
          auxVenta['fechaString'] = dia.fechaString;

          items.push(auxVenta)
        }
      });
    });
    this.itemsFiltrados = items;
  }
}
