import { Component, HostListener, OnInit } from '@angular/core';
// import { Producto } from '../nueva-funcionalidad/nueva-funcionalidad.component';
import { VisualizadorDeImagenComponent } from '../views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FormasDePagoComponent } from '../formas-de-pago/formas-de-pago.component';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { FormDetalleVentaComponent } from '../forms/form-detalle-venta/form-detalle-venta.component';
import { ItemFueraDelSistemaModalComponent } from '../item-fuera-del-sistema-modal/item-fuera-del-sistema-modal.component';
import { ProductosService } from 'src/app/services/productos.service';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';

export interface Venta {
  id: string; // ID único para la venta
  carrito: Carrito; // El carrito confirmado para la venta
  total: number; // Total de la venta
  pagos: Pago[]; // Lista de pagos realizados
  fecha: Date; // Fecha de la venta
}

export interface Pago {
  formaDePago: FormasDePago; // Tipo de pago utilizado
  cantidad: number; // Monto pagado con esta forma de pago
}

export enum FormasDePago {
  EFECTIVO = 'Efectivo',
  DOLARES = 'Dolares',
  TARJETA_CREDITO = 'Tarjeta de Crédito',
  TARJETA_DEBITO = 'Tarjeta de Débito',
  TRANSFERENCIA = 'Transferencia',
  MERCADO_PAGO = 'Mercado pago',
  VALE = 'Vale de compra',
  OTRO = 'Otro'
}


export interface Carrito {
  id: string,
  items: ItemCarrito[]
}
export interface ItemCarrito {
  idProducto: string,
  marca: string,
  descripcion: string,
  costo: number,
  precio: number,
  cantidad: number,
  codigo: string,
  images: string[],
  boleta?: number | null,
}
export interface ItemFueraDelSistema { precio: number, boleta: number | null, descripcion: string, cantidad: number, precioTotal?: number }
@Component({
  selector: 'app-selector-de-productos',
  templateUrl: './selector-de-productos.component.html',
  styleUrls: ['./selector-de-productos.component.scss'],
})

export class SelectorDeProductosComponent {
  precioDolarBlue: number = 0;
  itemFuraDelSistema: ItemFueraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 0 };
  itemsFueraDelSistema: ItemFueraDelSistema[] = [];

  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];
  carritos: Carrito[] = [];
  idCarritoSeleccionado: string | null = null;
  itemsCarritoSeleccionado: any[] = [];
  textoABuscar: string = '';
  codigoDeBarras: string = ''; // Para almacenar el código de barras temporalmente
  tiempoDeEspera: any; // Para controlar el tiempo de espera entre caracteres

  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private alertService: AlertService,
    private funcionesUtilesService: FuncionesUtilesService,
    private dataBase: DataBaseService,
    private productosService: ProductosService
  ) { }
  ngOnInit() {
    this.codigoDeBarras = '';
    this.dataBase.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });
  }


  ionViewWillEnter() {
    // Cargar los datos iniciales desde el servicio
    this.productosService.cargarDatosIniciales();
    this.productosService.productos$.subscribe(productos => {
      this.productos = productos;
      console.log('Productos actualizados:', this.productos);
    });

    // Recuperar carritos del localStorage
    const carritosGuardados = localStorage.getItem('carritos');
    const idCarritoSeleccionadoGuardado = localStorage.getItem('idCarritoSeleccionado');

    if (carritosGuardados && idCarritoSeleccionadoGuardado) {
      this.carritos = JSON.parse(carritosGuardados);
      this.idCarritoSeleccionado = idCarritoSeleccionadoGuardado;
    } else {
      // this.carritos = [{ id: '1', items: [] }];
      // this.idCarritoSeleccionado = '1';
      this.agregarCarrito();
    }
    // this.productosAMostrar = this.productos;
    // if (!this.carritos || this.carritos.length < 1) {
    //   this.carritos = [{ id: '1', items: [] }];
    //   this.idCarritoSeleccionado = '1';
    // }
  }

  // Maneja los eventos de teclado
  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // Filtra las teclas modificadoras
    if (event.key.length === 1) { // Solo considera teclas de un solo carácter
      console.log("ENTRA!");
      this.codigoDeBarras += event.key;
    }
    // Verifica si la tecla presionada es Enter
    if (event.key === 'Enter') {
      console.log("ENTRA2!");
      this.procesarCodigoDeBarras(this.codigoDeBarras);
      this.codigoDeBarras = ''; // Limpia el código de barras después de procesarlo
    }

    // Configura un tiempo de espera para evitar que se procese código de barras parcial
    clearTimeout(this.tiempoDeEspera);
    this.tiempoDeEspera = setTimeout(() => {
      console.log("ENTRA3!");
      if (this.codigoDeBarras) {
        this.procesarCodigoDeBarras(this.codigoDeBarras);
        this.codigoDeBarras = ''; // Limpia el código de barras después de procesarlo
      }
    }, 200); // Ajusta el tiempo de espera según tus necesidades
  }

  // Procesa el código de barras leído
  procesarCodigoDeBarras(codigo: string) {
    // Aquí puedes buscar el producto por el código y agregarlo al carrito
    let producto: any = this.productos.find(p => p.codigo === codigo);

    console.log(producto)
    console.log(this.productos)
    if (producto && this.idCarritoSeleccionado) {
      producto = this.funcionesUtilesService.clonarObjeto(producto);
      const carrito = this.carritos.find(c => c.id === this.idCarritoSeleccionado);
      if (carrito) {
        const itemEnCarrito = carrito.items.find(item => item.idProducto === producto.id);
        if (itemEnCarrito) {
          itemEnCarrito.cantidad++;
        } else {
          carrito.items.push({
            idProducto: producto.id,
            marca: producto.marca,
            descripcion: producto.producto,
            costo: this.redondearPrecioPesos((producto.costo * this.precioDolarBlue)),
            precio: producto.precio ? this.redondearPrecioPesos(producto.precio) : 0,
            cantidad: 1,
            codigo: producto.codigo ? producto.codigo : '',
            images: producto.images ? producto.images : []
          });
        }
        this.itemsCarritoSeleccionado = carrito.items;
        this.updateLocalStorage();
      }
    }
  }
  // Calcula el precio total de un carrito
  obtenerPrecioTotal(idCarrito: string): number {
    const carrito = this.carritos.find(carrito => carrito.id === idCarrito);
    if (carrito) {
      return carrito.items.reduce((total: number, item: any) => total + item.precio * item.cantidad, 0);
    }
    return 0;
  }

  // Busca productos en base a la cadena ingresada
  buscarProducto() {
    if (this.textoABuscar) {
      this.productosAMostrar = this.productos.filter((producto: Producto) => {
        // Verificar si el producto contiene el valor de búsqueda
        if (producto.producto.toLowerCase().includes(this.textoABuscar) ||
          (producto.codigo && producto.codigo.toLowerCase().includes(this.textoABuscar)) ||
          producto.marca.toLowerCase().includes(this.textoABuscar)
        ) {
          return producto;
        }
        return null;
      });

      return this.productosAMostrar;
    }
    return [];
  }

  // Maneja el evento de búsqueda
  onSubmit() {
    // Ejecuta la búsqueda y muestra los resultados
    const resultados = this.buscarProducto();
    console.log('Resultados de la búsqueda:', resultados);
    // Aquí podrías mostrar los resultados en la interfaz
  }

  // Limpia el campo de búsqueda
  limpiarBusqueda() {
    this.textoABuscar = '';
    // Opcional: Puedes también limpiar los resultados mostrados
  }

  // Selecciona un carrito
  seleccionarCarrito(idCarrito: string) {
    this.idCarritoSeleccionado = idCarrito;
    this.itemsCarritoSeleccionado = this.carritos.find(carrito => carrito.id === idCarrito)?.items || [];
  }

  // Elimina un producto del carrito
  eliminarDelCarrito(idProducto: string) {
    const carrito = this.carritos.find(carrito => carrito.id === this.idCarritoSeleccionado);
    if (carrito) {
      carrito.items = carrito.items.filter((item: any) => item.idProducto !== idProducto);
      this.itemsCarritoSeleccionado = carrito.items;
    }
    this.updateLocalStorage();
  }

  // Actualiza la cantidad de un producto en el carrito
  actualizarCantidad(idProducto: string, nuevaCantidad: number) {
    const carrito = this.carritos.find(carrito => carrito.id === this.idCarritoSeleccionado);
    if (carrito) {
      const item = carrito.items.find((item: any) => item.idProducto === idProducto);
      if (item) {
        item.cantidad = nuevaCantidad;
      }
    }
    this.updateLocalStorage();
  }

  generarIdUnicoCarrito(): string {
    let nuevoId = 1;
    const idsExistentes = new Set(this.carritos.map(carrito => parseInt(carrito.id, 10)));

    while (idsExistentes.has(nuevoId)) {
      nuevoId++;
    }

    return nuevoId.toString();
  }
  // Crea un nuevo carrito
  crearNuevoCarrito() {
    const nuevoIdCarrito = this.generarIdUnicoCarrito(); // O usa algún otro método para generar un ID único
    this.carritos.push({
      id: nuevoIdCarrito,
      items: []
    });
    this.idCarritoSeleccionado = nuevoIdCarrito;
    this.itemsCarritoSeleccionado = [];
    this.updateLocalStorage();
  }

  // Muestra la confirmación de checkout
  mostrarConfirmacionCheckout() {
    const precioTotal = this.obtenerPrecioTotal(this.idCarritoSeleccionado || '');
    console.log('Confirmación de Checkout - Total:', precioTotal);
    // Aquí podrías mostrar un modal de confirmación o procesar el checkout
  }

  async mostrarImagenCompleta(event: Event, imagen: string) {
    event.stopPropagation();
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen,
          isModal: true,
          ruta: 'nuevo-libro-diario'
        },
      });

      modal.onDidDismiss().then((resultado: any) => {
        if (!resultado.data || !resultado.role) return;
      });
      return await modal.present();
    } catch (err) {
      console.error('Error al mostrar la imagen:', err);
    }
  }

  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'Agregar Producto',
      inputs: [
        {
          name: 'descripcion',
          type: 'text',
          placeholder: 'Descripción'
        },
        {
          name: 'precio',
          type: 'number',
          placeholder: 'Precio'
        },
        {
          name: 'boleta',
          type: 'number',
          placeholder: 'Boleta'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Agregar',
          handler: (data) => {
            const descripcion = data.descripcion;
            const precio = this.redondearPrecioPesos(parseFloat(data.precio));
            if (descripcion && !isNaN(precio)) {
              // Aquí puedes manejar la adición del producto con la descripción y precio
              console.log('Descripción:', descripcion);
              console.log('Precio:', precio);
              if (this.idCarritoSeleccionado) {
                const carrito = this.carritos.find(c => c.id === this.idCarritoSeleccionado);
                if (carrito) {

                  carrito.items.push({
                    idProducto: '',
                    marca: 'Out of system',
                    descripcion: data.descripcion,
                    costo: 0,
                    precio: this.redondearPrecioPesos(data.precio),
                    cantidad: 1,
                    codigo: 'SIN CODIGO',
                    images: [],
                    boleta: data.boleta ? data.boleta : null
                  });

                  this.itemsCarritoSeleccionado = carrito.items;
                }
              }
            } else {
              // Mostrar error si los datos no son válidos
              console.log("DATOS INVALIDOS")
            }
          }
        }
      ]
    });

    await alert.present();
  }


  borrarCarrito(idCarrito: string) {
    this.carritos = this.carritos.filter(carrito => carrito.id !== idCarrito);
    if (this.idCarritoSeleccionado === idCarrito) {
      this.idCarritoSeleccionado = null;
      this.itemsCarritoSeleccionado = [];
    }
    this.updateLocalStorage();
  }

  confirmarFinalizacion() {
    this.alertService.alertConfirmacion('Confirmación', '¿Ya completo el carrito?', 'Si', () => {
      console.log(this.itemsCarritoSeleccionado)
      this.modalController.dismiss(this.itemsCarritoSeleccionado, 'agregarVentas');
    })
  }

  private redondearPrecioPesos(precio: number): number {
    let base = Math.floor(precio / 100) * 100;
    let diferencia = precio - base;
    if (diferencia === 0) {
      return base;
    }

    if (diferencia <= 50) {
      return base + 50;
    } else {
      return base + 100;
    }
  }


  confirmarVenta() {
    const totalVenta = this.obtenerPrecioTotal(this.idCarritoSeleccionado || '');
    const nuevaVenta: Venta = {
      id: this.generarIdUnicoVenta(),
      carrito: this.carritos.find(c => c.id === this.idCarritoSeleccionado) || { id: '', items: [] },
      total: totalVenta,
      pagos: [],
      fecha: new Date()
    };

    this.mostrarModalFormasDePago(nuevaVenta);
  }

  // Generar un ID único para la venta
  generarIdUnicoVenta(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Mostrar modal para seleccionar formas de pago
  async mostrarModalFormasDePago(venta: Venta) {
    const modal = await this.modalController.create({
      component: FormasDePagoComponent,
      componentProps: {
        venta
      }
    });

    modal.onDidDismiss().then((resultado: any) => {
      if (resultado.data) {
        // Procesar la venta con los pagos seleccionados
        if(resultado.role=='confirmar'){
          console.log("Guardar en firabes")
        }
        this.procesarVenta(resultado.data);
      }
    });

    return await modal.present();
  }

  // Procesar la venta final
  procesarVenta(venta: Venta) {
    console.log('Venta procesada:', venta);
    this.modalController.dismiss(venta, 'ventaProcesada');
    // Aquí puedes guardar la venta en tu base de datos o realizar otras acciones necesarias
  }


  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: ItemFueraDelSistemaModalComponent,
        componentProps: {
          isModal: false
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


        if (result.role == 'agregarAlCarrito') {
          const carrito = this.carritos.find(c => c.id === this.idCarritoSeleccionado);
          if (carrito) {
            result.data.forEach((item: ItemFueraDelSistema) => {
              let itemCarrito: ItemCarrito = {
                descripcion: item.descripcion,
                precio: item.precio,
                boleta: item.boleta,
                cantidad: item.cantidad,
                codigo: '',
                costo: 0,
                idProducto: '',
                images: [],
                marca: '',
              }
              carrito.items.push(itemCarrito);
            });
          }
          this.updateLocalStorage();
          console.log('agregar al carrito de venta', result.data);
        }

      })
      return await modal.present();
    } catch (err) {
    }
  }




  //localstorage carritos


  // Método para actualizar el localStorage cuando se actualicen los carritos o el carrito seleccionado
  updateLocalStorage() {
    localStorage.setItem('carritos', JSON.stringify(this.carritos));
    if (this.idCarritoSeleccionado) {
      localStorage.setItem('idCarritoSeleccionado', this.idCarritoSeleccionado);
    }
  }

  // Ejemplo de cómo llamar a updateLocalStorage cuando se actualicen los datos
  agregarCarrito() {
    const nuevoId = this.generarIdUnicoCarrito();
    this.carritos.push({ id: nuevoId, items: [] });
    this.idCarritoSeleccionado = nuevoId;
    this.updateLocalStorage();
  }

  cambiarCarritoSeleccionado(id: string) {
    this.idCarritoSeleccionado = id;
    this.updateLocalStorage();
  }

  eliminarCarrito(id: string) {
    this.carritos = this.carritos.filter(carrito => carrito.id !== id);
    if (this.idCarritoSeleccionado === id) {
      this.idCarritoSeleccionado = this.carritos.length > 0 ? this.carritos[0].id : '';
    }
    this.updateLocalStorage();
  }


  agregarItemFueraDelSistema() {
    this.itemsFueraDelSistema.push({ ...this.itemFuraDelSistema });
    this.itemFuraDelSistema = {
      precio: 0,
      boleta: null,
      descripcion: '',
      cantidad: 0
    }
  }
  cambiarCantidad(item: ItemFueraDelSistema, cantidad: number) {
    if (item.cantidad + cantidad >= 1) {
      item.cantidad = (item.cantidad + cantidad);
      item.precioTotal = (item.precio * item.cantidad);
      this.updateLocalStorage();
    }

  }

}
