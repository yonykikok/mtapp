import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FuncionesUtilesService } from './funciones-utiles.service';
import { DataBaseService } from './database.service';
import { Producto } from '../pages/lista-productos/lista-productos.page';
import { catchError, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productosSubject: BehaviorSubject<Producto[]> = new BehaviorSubject<Producto[]>([]);
public productos$: Observable<Producto[]> = this.productosSubject.asObservable();

  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];
  recargos!: { financiamiento: number, iva: number, margen: number };
  precioDolarBlue: number = 0;

  constructor(
    public funcionesUtiles: FuncionesUtilesService,
    private database: DataBaseService,
  ) { }

  cargarDatosIniciales() {
    this.obtenerCotizacionDolarBlue();
    this.obtenerRecargos();
    this.obtenerProductos();
  }

  private obtenerCotizacionDolarBlue() {
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').pipe(
      take(1), // toma solo la primera emisión y luego completa la suscripción
      catchError(err => {
        console.error('Error al obtener la cotización del dólar blue', err);
        return of(null);
      })
    ).subscribe((res: any) => {
      if (res) {
        this.precioDolarBlue = res.payload.data().price;
      }
    });
  }

  private obtenerRecargos() {
    this.database.obtenerPorId(environment.TABLAS.recargosProductos, 'recargos').pipe(
      take(1),
      catchError(err => {
        console.error('Error al obtener los recargos', err);
        return of(null);
      })
    ).subscribe((res: any) => {
      if (res) {
        this.recargos = res.payload.data();
      }
    });
  }

  private obtenerProductos() {
    this.database.obtenerTodos(environment.TABLAS.productos).pipe(
      take(1),
      catchError(err => {
        console.error('Error al obtener productos', err);
        return of([]);
      })
    ).subscribe((docsProductosRef: any[]) => {
      if (docsProductosRef.length <= 0) return;
  
      let lista = docsProductosRef.map((productoRef: any) => {
        let producto: Producto = productoRef.payload.doc.data();
        producto['id'] = productoRef.payload.doc.id;
        producto.precio = (this.calcularPrecioConRecargos(producto) * this.precioDolarBlue);
        return producto;
      });
  
      lista = this.ordenarListaPor(lista, 'producto', 'marca');
      this.productos = lista;
      this.productosAMostrar = [...this.productos];
  
      this.formatearProductos();
      
      // Emite la nueva lista de productos a través del BehaviorSubject
      this.productosSubject.next(this.productos);
  
      console.log(this.productos);
    });
  }
  

  private formatearProductos() {
    this.productos.forEach((obj: any) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === "") {
          obj[key] = null;
        }
      });
    });
  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  calcularPrecioConRecargos(producto: Producto) {
    // Verificamos que los recargos generales estén definidos y sean números válidos
    if (this.recargos && this.recargos.financiamiento !== undefined && this.recargos.iva !== undefined && this.recargos.margen !== undefined &&
      !isNaN(Number(this.recargos.financiamiento)) && !isNaN(Number(this.recargos.iva)) && !isNaN(Number(this.recargos.margen))
    ) {
      // Convertimos los porcentajes a fracciones decimales, utilizando valores del producto si están disponibles
      let margenDecimal = Number(producto.margen !== undefined ? producto.margen : this.recargos.margen) / 100;
      let ivaDecimal = Number(producto.iva !== undefined ? producto.iva : this.recargos.iva) / 100;
      let financiamientoDecimal = Number(producto.financiamiento !== undefined ? producto.financiamiento : this.recargos.financiamiento) / 100;

      // Aplicamos los recargos en secuencia
      let precioConMargen = producto.costo * (1 + margenDecimal);
      let precioConIva = precioConMargen * (1 + ivaDecimal);
      let precioConFinanciamiento = precioConIva * (1 + financiamientoDecimal);

      // Devolvemos el precio final con todos los recargos aplicados
      return precioConFinanciamiento;
    } else {
      console.info("No se puede calcular el precio: recargos inválidos o no definidos.");
      return 0;
    }
  }
}
