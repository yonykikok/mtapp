import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { StorageService } from 'src/app/services/storage.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { FormAltaProductoComponent } from '../forms/form-alta-producto/form-alta-producto.component';
import { VisualizadorDeImagenComponent } from '../views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CambiarStockProductoComponent } from '../cambiar-stock-producto/cambiar-stock-producto.component';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';
// import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';

export interface ProductoCarrito {
  id: string,//sera puesto por firebase
  checked: boolean,
  cantidad: number,
  codigo?: string,
  imgUrlsRef?: string[],
  images?: string[],
  marca: string,
  coloresDisponibles?: { stock: number; color: string; denominacionColor: string; }[],
  stockTotal: number,
  categoria: string,
  costo: number,
  iva?: number,
  producto: string,
  margen?: number,
  financiamiento?: number,
  precio: number;
}
// export interface Producto {
//   id: string,//sera puesto por firebase
//   codigo?: string,
//   imgUrlsRef?: string[],
//   images?: string[],
//   marca: string,
//   coloresDisponibles?: { stock: number; color: string; denominacionColor: string; }[],
//   cantidad: number,
//   categoria: string,
//   costo: number,
//   iva?: number,
//   producto: string,
//   margen?: number,
//   financiamiento?: number,
//   precio?: number;
// }
// export interface Producto {
//   id: string,//sera puesto por firebase
//   codigo?: string,
//   imgUrlsRef?: string[],
//   images?: string[],
//   marca: string,
//   coloresDisponibles?: { stock: number; color: string; denominacionColor: string; }[],
//   stockTotal: number,
//   categoria: string,
//   costo: number,
//   iva?: number,
//   producto: string,
//   margen?: number,
//   financiamiento?: number,
//   precio?: number;
// }
@Component({
  selector: 'app-nueva-funcionalidad',
  templateUrl: './nueva-funcionalidad.component.html',
  styleUrls: ['./nueva-funcionalidad.component.scss'],
})
export class NuevaFuncionalidadComponent implements OnInit {
  recargos: any;
  productos: any[] = [];
  camposSeleccionados = ['producto', 'codigo', 'cantidad', 'precio'];
  productosAMostrar: any[] = [];
  loggedUser!: User;
  isActionSheetOpen = false;
  productoSeleccionado!: Producto;
  actionSheetButtons: any[] = [{
    text: 'Editar información',
    icon: 'create-outline',
    handler: async () => {
      this.mostrarFormulario(true);
    },
  }, {
    text: 'Cambiar Stock',
    icon: 'chevron-expand-outline',
    handler: async () => {
      this.cambiarStockProducto(this.productoSeleccionado);
    },
  }, {
    text: 'Eliminar',
    icon: 'trash-outline',
    handler: async () => {
      this.confirmarEliminacion(this.productoSeleccionado)
    },
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];
  constructor(public funcionesUtiles: FuncionesUtilesService,
    private imageCompress: NgxImageCompressService,
    private storageService: StorageService,
    private authService: AuthService,
    private database: DataBaseService,
    private toastService: ToastService,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private modalController: ModalController) {
    this.authService.user$.subscribe(res => {
      this.loggedUser = res;
    })
  }
  async mostrarImagenCompleta(event: Event, imagen: string) {
    event.stopPropagation();
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen,
          isModal: true,
          ruta: 'dashboard'
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }
  ngOnInit() {
    this.database.obtenerPorId(environment.TABLAS.recargosProductos, 'recargos').subscribe((res: any) => {

      this.recargos = res.payload.data();
    });

    // this.database.crearConCustomId(environment.TABLAS.recargosProductos, 'recargos', {
    //   iva: 21,
    //   margen: 80,
    //   financiamiento: 8,
    // })
    this.database.obtenerTodos(environment.TABLAS.productos).subscribe((docsProductosRef: any) => {
      if (docsProductosRef.length <= 0) return;
      let lista = docsProductosRef.map((productoRef: any) => {
        let producto = productoRef.payload.doc.data();
        producto['id'] = productoRef.payload.doc.id;
        producto['precio'] = this.calcularPrecioConRecargos(producto.costo);
        return producto;
      });
      lista = this.ordenarListaPor(lista, 'producto', 'marca');
      this.productos = lista;
      this.productosAMostrar = [...this.productos];
      console.log(this.productos)
    });




    this.productos.forEach((obj: any) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === "") {
          obj[key] = null;
        }
      });
    });
    // productoseas.forEach((element, i) => {
    //   this.database.crear(environment.TABLAS.productos, element).then(res => {
    //     console.log(i)

    //   });
    // });
    console.log(this.productos)
    // let productos = this.productos.map(produ => {
    //   produ.precio_con_iva = Number(produ.precio_con_iva);
    //   return produ;
    // })
    // console.log(productos)
  }


  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }
  async seleccionar(producto: any) {
    try {
      const modal = await this.modalController.create({
        component: "DetalleModuloComponent",
        componentProps: {
          producto,
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

      })
      return await modal.present();
    } catch (err) {
    }

  }

  filtrarProductos(event: any) {
    console.log(event.target.value);
    const valorBusqueda = event.target.value.toLowerCase();
    this.productosAMostrar = this.productos.filter(producto => {
      // Verificar si el producto contiene el valor de búsqueda
      if (producto.producto.toLowerCase().includes(valorBusqueda) ||
        producto.codigo.toLowerCase().includes(valorBusqueda) ||
        producto.marca.toLowerCase().includes(valorBusqueda)
      ) {
        return producto;
      }
    });
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  mostrarOpciones(producto: Producto) {
    this.productoSeleccionado = producto;
    this.setOpen(true);
  }


  async agregarCodigoDeBarra(event: Event, producto: any) {
    event.stopPropagation();
    try {
      const modal = await this.modalController.create({
        component: BarcodeScannerComponent,
        componentProps: {
          producto,
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

      })
      return await modal.present();
    } catch (err) {
    }
  }

  cargarImagen(event: Event, producto: any) {
    event.stopPropagation();
    const MAX_MEGABYTE = 0.5;
    let posicionDisponible = this.obtenerPosicionDisponibles(producto);
    console.log(posicionDisponible)
    if (posicionDisponible != undefined) {
      console.log(posicionDisponible);
      let imgName = `${Date.now()}`
      this.imageCompress
        .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
        .then(
          (result: string) => {//caso de que comprima
            this.subirImagen(producto, `productos/`, imgName, result);
          },
          (result: string) => {//caso de que NO comprima
            this.subirImagen(producto, `productos/`, imgName, result);
          });
    }
  }


  subirImagen(producto: any, imgPath: string, imgName: string, imgBase64: string) {

    this.storageService.subirImagen(imgPath + imgName, imgBase64).then((urlImagen) => {

      let urlRef = imgPath + imgName;

      console.log(`imgUrls: `, urlImagen)
      console.log(`imgUrlsRef: `, urlRef)
      if (urlImagen) {
        if (!producto.images || !producto.imgUrlsRef) {
          producto.imgUrlsRef = [];
          producto.images = [];
        }
        producto.imgUrlsRef.push(urlRef);
        producto.images.push(urlImagen);
      }
      if (producto.id) {
        this.database.actualizar(environment.TABLAS.productos, producto, producto.id)?.then((res: any) => {
          // this.spinnerService.stopLoading();
          this.toastService.simpleMessage('Existo', 'Nueva imagen añadida', ToastColor.success);

        }).catch(err => {
          this.toastService.simpleMessage('Error', 'No se pudo agregar la imagen', ToastColor.danger);
        })
      }
    }).catch(err => {
      this.toastService.simpleMessage('Error', 'al subir la image ocurrio un error ("equipos disponibles")', ToastColor.danger);
    });
  }

  obtenerPosicionDisponibles(producto: any) {
    let posicionesDiponibles: number[] = [];
    const imagenesRefSinRepetidos = Array.from(new Set(producto.imgUrlsRef));
    console.log(imagenesRefSinRepetidos);
    let posiblesPosiciones = [0, 1];

    posiblesPosiciones.forEach(posicion => {
      let existe = false;
      imagenesRefSinRepetidos.forEach((imgRef: any) => {

        const partes = imgRef.split('-');
        const obtenerUltimoDigito = parseInt(partes[partes.length - 1], 10);

        if (posicion == obtenerUltimoDigito) {
          existe = true
        }
      });
      if (existe) {

      } else {
        posicionesDiponibles.push(posicion);
        console.log("disponible: ", posicion)

      }

    });
    console.log("posiciones disponible: ", posicionesDiponibles)
    return posicionesDiponibles[0];

  }

  async mostrarFormulario(modoActualizarInformacion?: boolean) {
    let modal = await this.modalController.create({
      component: FormAltaProductoComponent,
      componentProps: {
        modoActualizarInformacion,
        productoAModificar: this.productoSeleccionado
      }
    });
    modal.present();
  }

  calcularPrecioConRecargos(costo: number): number {
    // Los recargos son números entre 1 y 100, por lo que deben ser convertidos a porcentajes
    let precioConMargen = costo * (1 + this.recargos.margen / 100);
    let precioConIva = precioConMargen * (1 + this.recargos.iva / 100);
    let precioConFinanciamiento = precioConIva * (1 + this.recargos.financiamiento / 100);

    return precioConFinanciamiento;
  }


  confirmarEliminacion(producto: Producto) {
    this.alertService.alertConfirmacion('Confirmar eliminacion', '¿Quiere eliminar este producto?', 'Si', () => {
      if (producto.imgUrlsRef && producto.imgUrlsRef.length > 0) {
        this.spinnerService.showLoading("Eliminando producto...");
        console.log(producto)
        producto.imgUrlsRef?.forEach(async (imgRef:string) => {
          try {
            let result = await this.storageService.borrarImagen(imgRef);


          } catch (error) {
            console.error(error);
          } finally {
            this.database.eliminar(environment.TABLAS.productos, producto.id).finally(() => {
              this.spinnerService.stopLoading();
            });
          }
        });

      }
      this.database.eliminar(environment.TABLAS.productos, producto.id).then(res => {

      });
    })
  }
  async cambiarStockProducto(producto: Producto) {
    let modal = await this.modalController.create({
      component: CambiarStockProductoComponent,
      componentProps: {
        producto
      }
    });
    modal.present();

  }
}
