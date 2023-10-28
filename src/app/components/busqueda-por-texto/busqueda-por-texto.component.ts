import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda-por-texto',
  templateUrl: './busqueda-por-texto.component.html',
  styleUrls: ['./busqueda-por-texto.component.scss'],
})
export class BusquedaPorTextoComponent implements OnInit {
  textoABuscar = "";
  mesSeleccionado: any;
  itemsFiltrados: any;
  mostrarBuscador: any;
  itemSeleccionado: any;
  constructor() { }

  ngOnInit() {
    this.applyFilter();
  }


  applyFilter() {
    let items: any[] = [];

    this.mesSeleccionado.dias.forEach((dia: any) => {
      dia.ventas.forEach((venta: any) => {
        if (venta.descripcion.toLowerCase().includes(this.textoABuscar.toLowerCase()) ||
          venta?.boleta?.toString()?.includes(this.textoABuscar.toLowerCase())) {
          let auxVenta = { ...venta };
          auxVenta['fecha'] = dia.fecha;
          auxVenta['fechaString'] = dia.fechaString;

          items.push(auxVenta)
        }
      });
    });
    //console.log(items)
    this.itemsFiltrados = items.sort((a: any, b: any) => {
      if (a.fecha > b.fecha) {
        return 1;
      } else if (a.boleta < b.boleta) {
        return -1;
      } else {
        return 0;
      }
    });
    // this.itemsFiltrados = items;
  }
}
