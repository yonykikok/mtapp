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
import { Producto, ProductoCarrito } from 'src/app/pages/lista-productos/lista-productos.page';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SelectorDeProductosComponent } from '../selector-de-productos/selector-de-productos.component';
import { ItemReparacionModalComponent } from '../item-reparacion-modal/item-reparacion-modal.component';

export interface Venta {
  id: string; // ID único para la venta
  carrito: Carrito; // El carrito confirmado para la venta
  total: number; // Total de la venta
  pagos: Pago[]; // Lista de pagos realizados
  fecha: any; // Fecha de la venta
  expand?: boolean,//se usa para expandir el carrito y mostrar detalle en vistas.
  cuentaSaldada: boolean
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
export enum EstadoCarrito {
  PENDIENTE = 'Pendiente',
  ABONADO = 'Abonado',
}


export interface Carrito {
  estado: EstadoCarrito,
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
  descuento?:{
    tipo: 'porcentaje' | 'valor';
    cantidad: number;
    fechaInicio?: number; // Fecha de inicio del descuento
    fechaFin?: number;    // Fecha de finalización del descuento
  }
}
export interface ItemFueraDelSistema { precio: number, boleta: number | null, descripcion: string, cantidad: number, precioTotal?: number }
@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss'],
})
export class CarritosComponent implements OnInit {

  modalAbierto = false;
  segmentSeleccionado = 'abiertos';
  precioDolarBlue: number = 0;
  itemFuraDelSistema: ItemFueraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 0 };
  itemsFueraDelSistema: ItemFueraDelSistema[] = [];

  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];
  carritos: Carrito[] = [];
  carritoSeleccionado!: Carrito;
  idCarritoSeleccionado: string | null = null;
  itemsCarritoSeleccionado: any[] = [];
  textoABuscar: string = '';
  codigoDeBarras: string = ''; // Para almacenar el código de barras temporalmente
  tiempoDeEspera: any; // Para controlar el tiempo de espera entre caracteres

  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private alertService: AlertService,
    public funcionesUtilesService: FuncionesUtilesService,
    private dataBase: DataBaseService,
    private productosService: ProductosService,
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
    if (this.modalAbierto) {
      return; // Si el modal está abierto, no hacer nada
    }
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
  seleccionarCarrito(carritoSeleccionado: Carrito) {
    this.carritoSeleccionado = carritoSeleccionado;
    this.idCarritoSeleccionado = carritoSeleccionado.id;
    this.itemsCarritoSeleccionado = this.carritos.find(carrito => carrito.id === carritoSeleccionado.id)?.items || [];
  }

  cambiarPrecio(item: ProductoCarrito) {
    this.alertController.create({
      header: 'Ingrese el precio por unidad',
      inputs: [
        {
          name: 'precio',
          type: 'number',
          placeholder: 'Nuevo precio',
          value: item.precio
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            const nuevoPrecio = parseFloat(data.precio);
            if (!isNaN(nuevoPrecio) && nuevoPrecio > 0) {
              item.precio = nuevoPrecio;
              // this.updateLocalStorage();
            } else {
              console.log('Precio no válido');
            }
          }
        }
      ]
    }).then(alert => alert.present());
  }

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
      items: [],
      estado: EstadoCarrito.PENDIENTE
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
      carrito: this.carritos.find(c => c.id === this.idCarritoSeleccionado) || { id: '', items: [], estado: EstadoCarrito.PENDIENTE },
      total: totalVenta,
      pagos: [],
      fecha: new Date(),
      cuentaSaldada: false
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
        if (resultado.role == 'confirmar') {
          this.carritoSeleccionado.estado = EstadoCarrito.ABONADO
          this.updateLocalStorage();
          console.log("Guardar en firabes")
          console.log(resultado.data);
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


  async mostrarFlujoReparacion() {

    try {
      const modal = await this.modalController.create({
        component: ItemReparacionModalComponent,
        componentProps: {
          isModal: false,
          productos: this.productos
        },
      })
      this.modalAbierto = true;

      modal.onDidDismiss().then((result: any) => {
        this.modalAbierto = false;
        if (!result.data || !result.role) return;


        if (result.role == 'agregarAlCarrito') {
          console.log("--", result)
          return;
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
              // carrito.items.push(itemCarrito);
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
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: ItemFueraDelSistemaModalComponent,
        componentProps: {
          isModal: false,
          productos: this.productos
        },
      })
      this.modalAbierto = true;

      modal.onDidDismiss().then((result: any) => {
        this.modalAbierto = false;
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
    this.carritos.push({ id: nuevoId, items: [], estado: EstadoCarrito.PENDIENTE });
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

  async mostrarSelectorDeProductos() {

    try {
      const modal = await this.modalController.create({
        component: SelectorDeProductosComponent,
        componentProps: {
          isModal: false,
          productos: this.productos
        },
      })
      this.modalAbierto = true;

      modal.onDidDismiss().then((result: any) => {
        this.modalAbierto = false;
        if (!result.data || !result.role) return;

        if (result.role == 'productoSeleccionado') {

          let producto: Producto = result.data;

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
                  precio: producto.precio ? this.redondearPrecioPesos(this.funcionesUtilesService.calcularPrecioConDescuento(producto)) : 0,
                  cantidad: 1,
                  codigo: producto.codigo ? producto.codigo : '',
                  images: producto.images ? producto.images : [],
                  descuento: result.data.descuento || null
                });
              }
              this.itemsCarritoSeleccionado = carrito.items;
              this.updateLocalStorage();
            }
          }

        }

      })
      return await modal.present();
    } catch (err) {
    }
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




