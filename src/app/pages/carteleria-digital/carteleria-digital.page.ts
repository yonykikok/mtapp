import { Component, Input, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carteleria-digital',
  templateUrl: './carteleria-digital.page.html',
  styleUrls: ['./carteleria-digital.page.scss'],
})
export class CarteleriaDigitalPage implements OnInit {
  @Input() productos: any[] = [];
  currentIndex: number = 0;
  intervalTime: number = 10000; // Cambiar cada 5 segundos
  precioDolarBlue: number = 0;
  constructor(public funcionesUtiles: FuncionesUtilesService,
    private database: DataBaseService,
  ) { }
  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.productos.length;
    }, this.intervalTime);
  }
  ionViewWillEnter() {

    let productosLocalStorage = this.obtenerListaDeProductosLocalStorage();
    if (productosLocalStorage && productosLocalStorage.length > 0) {
      console.log("USAMOS LISTA LOCAL", productosLocalStorage);
    
      this.productos = productosLocalStorage.sort((a:any, b:any) => {
        const tieneDescuentoA = a.descuento && this.funcionesUtiles.productoTieneDescuentoVigente(a) && a.descuento.cantidad > 0;
        const tieneDescuentoB = b.descuento && this.funcionesUtiles.productoTieneDescuentoVigente(b) && b.descuento.cantidad > 0;
    
        if (tieneDescuentoA && !tieneDescuentoB) return -1; // A tiene descuento, B no → A primero
        if (!tieneDescuentoA && tieneDescuentoB) return 1;  // B tiene descuento, A no → B primero
    
        return Math.random() - 0.5; // Orden aleatorio dentro de cada grupo
      });
    }
    

    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });
  }
  obtenerListaDeProductosLocalStorage() {
    const listaGuardada = localStorage.getItem('productos');
    const fechaGuardada = localStorage.getItem('fechaCargaProductos');
    const hoy = new Date().toDateString(); // Fecha actual en formato simplificado
    if (listaGuardada && fechaGuardada === hoy) {
      // Convierte el string a un array de productos y lo devuelve
      return JSON.parse(listaGuardada);
    } else {
      return null;
    }
  }
}
