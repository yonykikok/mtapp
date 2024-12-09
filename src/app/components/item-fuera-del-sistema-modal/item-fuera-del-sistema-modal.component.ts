import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';
import { ItemFueraDelSistema } from '../carritos/carritos.component';

@Component({
  selector: 'app-item-fuera-del-sistema-modal',
  templateUrl: './item-fuera-del-sistema-modal.component.html',
  styleUrls: ['./item-fuera-del-sistema-modal.component.scss'],
})
export class ItemFueraDelSistemaModalComponent {
  itemFuraDelSistema: ItemFueraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 1 };
  itemsFueraDelSistema: ItemFueraDelSistema[] = [];
  // productos: Producto[] = [];
  // productosAMostrar: Producto[] = [];

  constructor(private modalController: ModalController) { }

  agregarItemFueraDelSistema() {
    this.itemsFueraDelSistema.push({ ...this.itemFuraDelSistema, precioTotal: this.itemFuraDelSistema.precio });
    this.itemFuraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 1 };
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  eliminarItem(selectedItem: any) {
    this.itemsFueraDelSistema.splice(this.itemsFueraDelSistema.findIndex(item => selectedItem === item), 1);
  }
  agregarAlCarrito() {
    this.modalController.dismiss(this.itemsFueraDelSistema, 'agregarAlCarrito');
  }

  cambiarCantidad(item: ItemFueraDelSistema, cantidad: number) {
    console.log(item)
    if (item.cantidad + cantidad >= 1) {
      item.cantidad = (item.cantidad + cantidad);
      item.precioTotal = (item.precio * item.cantidad);
    }

  }


  // filtrarProductos(event: any) {
  //   event.stopPropagation();
  //   console.log("Etnras")
  //   const valorBusqueda = event.target.value.toLowerCase();
  //   const productosFiltrados = this.productos.filter((producto: Producto) => {
  //     // Verificar si el producto contiene el valor de búsqueda
  //     return (
  //       producto.producto.toLowerCase().includes(valorBusqueda) ||
  //       (producto.codigo && producto.codigo.toLowerCase().includes(valorBusqueda)) ||
  //       producto.categoria.toLowerCase().includes(valorBusqueda) ||
  //       producto.marca.toLowerCase().includes(valorBusqueda)
  //     );
  //   });

  //   // Actualizar la lista mostrada solo con los productos filtrados
  //   this.productosAMostrar = productosFiltrados; // Limitar la cantidad de productos mostrados
  //   console.log(this.productosAMostrar)


  //   // Llamar a la función de ordenamiento si es necesario
  //   this.ordenarPorPrecio(true);
  // }
  // ordenarPorPrecio(ascendente: boolean = true): void {
  //   this.productosAMostrar = this.productosAMostrar.sort((a: Producto, b: Producto) => {
  //     const precioA = a.precio !== undefined ? a.precio : 0;
  //     const precioB = b.precio !== undefined ? b.precio : 0;

  //     if (ascendente) {
  //       return precioA - precioB;
  //     } else {
  //       return precioB - precioA;
  //     }
  //   });
  // }

  // seleccionar(producto: Producto) {
  //   this.itemFuraDelSistema =
  //     { precio: producto.precio || 0, boleta: null, descripcion: producto.producto, cantidad: 1, ...producto };

  //   this.itemsFueraDelSistema.push({ ...this.itemFuraDelSistema, precioTotal: this.itemFuraDelSistema.precio });
  //   this.itemFuraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 1 };
  //   this.productosAMostrar = [];
  // }

}
