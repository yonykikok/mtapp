import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';

@Component({
  selector: 'app-selector-de-productos',
  templateUrl: './selector-de-productos.component.html',
  styleUrls: ['./selector-de-productos.component.scss'],
})

export class SelectorDeProductosComponent {
  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];




  constructor(private modalController: ModalController) { }
  filtrarProductos(event: any) {
    event.stopPropagation();
    console.log("Etnras")
    const valorBusqueda = event.target.value.toLowerCase();
    const productosFiltrados = this.productos.filter((producto: Producto) => {
      // Verificar si el producto contiene el valor de búsqueda
      return (
        producto.producto.toLowerCase().includes(valorBusqueda) ||
        (producto.codigo && producto.codigo.toLowerCase().includes(valorBusqueda)) ||
        producto.categoria.toLowerCase().includes(valorBusqueda) ||
        producto.marca.toLowerCase().includes(valorBusqueda)
      );
    });

    // Actualizar la lista mostrada solo con los productos filtrados
    this.productosAMostrar = productosFiltrados; // Limitar la cantidad de productos mostrados
    console.log(this.productosAMostrar)


    // Llamar a la función de ordenamiento si es necesario
    this.ordenarPorPrecio(true);
  }
  ordenarPorPrecio(ascendente: boolean = true): void {
    this.productosAMostrar = this.productosAMostrar.sort((a: Producto, b: Producto) => {
      const precioA = a.precio !== undefined ? a.precio : 0;
      const precioB = b.precio !== undefined ? b.precio : 0;

      if (ascendente) {
        return precioA - precioB;
      } else {
        return precioB - precioA;
      }
    });
  }

  seleccionar(producto: Producto) {
    this.modalController.dismiss(producto,'productoSeleccionado');
    this.productosAMostrar = [];
  }
}