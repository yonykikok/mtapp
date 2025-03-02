import { Component, HostListener, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';

@Component({
  selector: 'app-selector-de-productos',
  templateUrl: './selector-de-productos.component.html',
  styleUrls: ['./selector-de-productos.component.scss'],
})

export class SelectorDeProductosComponent {
  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];




  constructor(private modalController: ModalController,
    public funcionesUtiles:FuncionesUtilesService
  ) { }
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
    console.log(producto)
    this.modalController.dismiss(producto, 'productoSeleccionado');
    this.productosAMostrar = [];
  }

  // productoTieneDescuentoVigente(producto: Producto): boolean {
  //   const hoy = Date.now(); // Obtener la fecha actual en milisegundos
  //   const { descuento } = producto;

  //   if (!descuento) {
  //     return false;
  //   }

  //   const fechaInicio = descuento.fechaInicio;
  //   const fechaFin = descuento.fechaFin;

  //   // Verificar si las fechas están definidas y si el descuento está dentro del rango de vigencia
  //   if (fechaInicio && fechaFin && (hoy < fechaInicio || hoy > fechaFin)) {
  //     return false;
  //   }

  //   return true;
  // }
  // calcularPrecioConDescuento(producto: Producto): number {
  //   if (!producto.precio || !producto.descuento) return producto.precio || 0;
  //   if (!this.productoTieneDescuentoVigente(producto)) return producto.precio || 0;

  //   const { descuento } = producto;
  //   const hoy = new Date();
  //   if (!descuento.fechaInicio || !descuento.fechaFin) return producto.precio || 0;

  //   // Convertir las fechas de descuento a objetos Date
  //   const fechaInicio = new Date(descuento.fechaInicio);
  //   const fechaFin = new Date(descuento.fechaFin);

  //   // Verificar si el descuento está dentro de la vigencia
  //   if (hoy < fechaInicio || hoy > fechaFin) {
  //     // Si el descuento no está vigente, devolver el precio original
  //     return producto.precio;
  //   }

  //   let precioFinal = producto.precio;

  //   // Aplicar el descuento si está vigente
  //   if (descuento.tipo === 'porcentaje') {
  //     precioFinal -= (producto.precio * descuento.cantidad) / 100;
  //   } else if (descuento.tipo === 'valor') {
  //     precioFinal -= descuento.cantidad;
  //   }

  //   // Verificar si el precio final está por debajo del costo
  //   if (precioFinal < producto.costo) {
  //     console.warn('El descuento aplicado deja el precio final por debajo del costo. Esto generaría una pérdida.');
  //     // Retornamos el precio original si no queremos aplicar el descuento
  //     return producto.precio;
  //   }

  //   return precioFinal;
  // }
}