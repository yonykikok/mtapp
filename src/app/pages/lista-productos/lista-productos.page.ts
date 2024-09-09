import { Component, HostListener, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { StorageService } from 'src/app/services/storage.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { BarcodeScannerComponent } from 'src/app/components/barcode-scanner/barcode-scanner.component';
import { FormAltaProductoComponent } from 'src/app/components/forms/form-alta-producto/form-alta-producto.component';
import { CambiarStockProductoComponent } from 'src/app/components/cambiar-stock-producto/cambiar-stock-producto.component';
import { FormImpuestosProductoComponent } from 'src/app/components/forms/form-impuestos-producto/form-impuestos-producto.component';
import { roles } from 'src/app/services/info-compartida.service';
import { FormAumentoPorcentualComponent } from 'src/app/components/forms/form-aumento-porcentual/form-aumento-porcentual.component';
import { GeneradorDeCodigosDeBarraComponent } from 'src/app/components/generador-de-codigos-de-barra/generador-de-codigos-de-barra.component';
import { ActualizadorDePrecioProductoComponent } from 'src/app/components/actualizador-de-precio-producto/actualizador-de-precio-producto.component';

export interface Producto {
  id: string,//sera puesto por firebase
  codigo?: string,
  imgUrlsRef?: string[],
  images?: string[],
  marca: string,
  coloresDisponibles?: { stock: number; color: string; denominacionColor: string; }[],
  // cantidad: number,
  categoria: string,
  stockTotal: number,
  costo: number,
  iva?: number,
  producto: string,
  margen?: number,
  financiamiento?: number,
  precio?: number;
}


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  roles=roles;
  codigoDeBarras: string = ''; // Para almacenar el código de barras temporalmente
  tiempoDeEspera: any; // Para controlar el tiempo de espera entre caracteres
  mostrarCosto: boolean = false;
  recargos!: {
    financiamiento: number,
    iva: number,
    margen: number
  };
  precioDolarBlue: number = 0;
  productos: Producto[] = [];
  camposSeleccionados = ['producto', 'codigo', 'cantidad', 'precio'];
  productosAMostrar: Producto[] = [];
  cantidadPorPagina = 35; // Cantidad de productos a mostrar por página
  infiniteScrollDisabled = false; // Variable para controlar el estado del infinite scroll
  loggedUser!: User;
  isActionSheetOpen = false;
  productoSeleccionado!: Producto;
  actionSheetButtons: any[] = [];
  actionSheetButtonsOrigial: any[] = [{
    text: 'Editar impuestos',
    icon: 'calculator-outline',
    handler: async () => {

      if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
        this.mostrarFormularioImpuestos(false);
      } else {
        alert("No tienes permisos para esta acción.")
      }
    },
  }, {
    text: 'Editar información',
    icon: 'create-outline',
    handler: async () => {
      if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
        this.mostrarFormulario(true);
      } else {
        alert("No tienes permisos para esta acción.")
      }
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

  loadData(event: any) {
    setTimeout(() => {
      const inicio = this.productosAMostrar.length;
      const fin = inicio + this.cantidadPorPagina;

      const nuevosProductos = this.productos.slice(inicio, fin);
      this.productosAMostrar = [...this.productosAMostrar, ...nuevosProductos];

      event.target.complete();

      // Desactiva el infinite scroll si todos los productos están cargados
      if (this.productosAMostrar.length >= this.productos.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  mostrarCostoToggle(e: Event) {
    e.stopPropagation();
    if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
      this.mostrarCosto = !this.mostrarCosto;
    }
  }

  async mostrarImagenCompleta(event: Event, imagen: string) {
    event.stopPropagation();
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen,
          isModal: true,
          ruta: 'lista-productos',
          mostrarOpcionesIcon: false
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }

  ionViewWillEnter() {
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

    this.actionSheetButtons = [...this.actionSheetButtonsOrigial];
    this.database.obtenerPorId(environment.TABLAS.recargosProductos, 'recargos').subscribe((res: any) => {
      this.recargos = res.payload.data();
    });

    let subs = this.database.obtenerTodos(environment.TABLAS.productos).subscribe((docsProductosRef: any) => {
      subs.unsubscribe();
      if (docsProductosRef.length <= 0) return;

      let lista = docsProductosRef.map((productoRef: any) => {
        let producto: Producto = productoRef.payload.doc.data();
        producto['id'] = productoRef.payload.doc.id;
        producto.precio = (this.calcularPrecioConRecargos(producto) * this.precioDolarBlue);
        return producto;
      });

      lista = this.ordenarListaPor(lista, 'producto', 'marca');
      this.productos = lista;
      this.productosAMostrar = this.productos.slice(0, this.cantidadPorPagina); // Inicialmente muestra solo los primeros productos

      console.log(this.productos);

      this.productos.forEach((obj: any) => {
        Object.keys(obj).forEach(key => {
          if (obj[key] === "") {
            obj[key] = null;
          }
        });
      });
    });
  }

  ngOnInit() {

  }
  async solicitarConfirmacion(e: Event, producto: Producto) {
    e.stopPropagation();
    let modal = await this.modalController.create({
      component: GeneradorDeCodigosDeBarraComponent,
      componentProps: {
        codigo: producto.codigo
      }
    })
    modal.onDidDismiss().then((result) => {
      if (result.data && result.role == 'Guardar Codigo') {
        producto.codigo = result.data;
        this.spinnerService.showLoading('Cargando codigo...');
        this.database.actualizar(environment.TABLAS.productos, producto, producto.id)?.finally(() => {

          this.spinnerService.stopLoading();
        })
      }
    });
    modal.present();
    // this.alertService.alertConfirmacion('Confirmación', '¿Quiere generar un nuevo codigo de barras aleatorio?', 'Si', () => {
    //   producto.codigo=this.funcionesUtiles.generateBarcodeValue();
    // });
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
    this.productosAMostrar = productosFiltrados.slice(0, this.cantidadPorPagina); // Limitar la cantidad de productos mostrados

    // Restablecer el infinite scroll
    this.infiniteScrollDisabled = false; // Habilitar de nuevo si estaba deshabilitado

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


  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  mostrarOpciones(producto?: Producto) {
    if (producto) {
      this.productoSeleccionado = producto;
      this.actionSheetButtons = [...this.actionSheetButtonsOrigial];
    } else {
      this.actionSheetButtons = [{
        text: 'Editar impuestos generales',
        icon: 'calculator-outline',
        handler: async () => {

          if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
            this.mostrarFormularioImpuestos(true);
          } else {
            alert("No tienes permisos para esta acción.")
          }
        },
      }, {
        text: 'Aumentar el costo (%) general ',
        icon: 'stats-chart-outline',
        handler: async () => {
          if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
            this.mostrarFormularioAumentoPorcentual();
          } else {
            alert("No tienes permisos para esta acción.")
          }
        },
      }, {
        text: 'Cancelar',
        role: 'cancel',
        icon: 'close',
        handler: () => { },
      }];
    }
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
    if (posicionDisponible != undefined) {
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

      }

    });
    return posicionesDiponibles[0];

  }

  async mostrarFormulario(modoActualizarInformacion?: boolean) {
    let modal = await this.modalController.create({
      component: FormAltaProductoComponent,
      componentProps: {
        modoActualizarInformacion,
        productoAModificar: this.productoSeleccionado,
        precioDolarBlue: this.precioDolarBlue,
        loggedUser: this.loggedUser
      }
    });
    modal.present();
  }

  async mostrarFormularioImpuestos(impuestosGenerales: boolean) {
    let modal = await this.modalController.create({
      component: FormImpuestosProductoComponent,
      componentProps: {
        producto: this.productoSeleccionado,
        impuestosGenerales,
        precioDolarBlue: this.precioDolarBlue
      }
    });
    modal.present();
  }
  async mostrarFormularioAumentoPorcentual() {
    let modal = await this.modalController.create({
      component: FormAumentoPorcentualComponent,
      componentProps: {
        productos: this.productos
      }
    });

    modal.onDidDismiss().then(result => {
      if (result.data && result.role == 'aplicarAumento') {
        this.productos.forEach(prod => {
          let porcentajeDeAumento: number = result.data;
          // Convertimos el porcentaje de aumento a un valor decimal
          if (porcentajeDeAumento && typeof porcentajeDeAumento == 'number') {
            let aumentoDecimal = porcentajeDeAumento / 100;
            // Calculamos el nuevo costo aplicando el aumento
            prod.costo = prod.costo * (1 + aumentoDecimal);
            prod.precio = this.calcularPrecioConRecargos(prod);
            this.database.actualizar(environment.TABLAS.productos, prod, prod.id)?.then(res => {

            }).catch(err => {
              console.error(err)
            });
          }
        });

      }

    })
    modal.present();
  }

  calcularPrecioConRecargos(producto: Producto) {
    // Verificamos que los recargos generales estén definidos y sean números válidos
    if (this.recargos.financiamiento !== undefined && this.recargos.iva !== undefined && this.recargos.margen !== undefined &&
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

  calcularCostoDesdePrecioFinal(precioFinal: number, recargos: { financiamiento: number, iva: number, margen: number }) {
    if (recargos.financiamiento !== undefined && recargos.iva !== undefined && recargos.margen !== undefined &&
      !isNaN(Number(recargos.financiamiento)) && !isNaN(Number(recargos.iva)) && !isNaN(Number(recargos.margen))
    ) {
      // Convertimos los porcentajes a fracciones decimales
      let margenDecimal = Number(recargos.margen) / 100;
      let ivaDecimal = Number(recargos.iva) / 100;
      let financiamientoDecimal = Number(recargos.financiamiento) / 100;

      // 1. Eliminamos el recargo por financiamiento
      let precioConIva = precioFinal / (1 + financiamientoDecimal);

      // 2. Eliminamos el recargo por IVA
      let precioConMargen = precioConIva / (1 + ivaDecimal);

      // 3. Eliminamos el recargo por margen
      let costo = precioConMargen / (1 + margenDecimal);

      // Devolvemos el costo base del producto
      return costo;
    } else {
      console.info("No se puede calcular el costo: recargos inválidos o no definidos.");
      return 0;
    }
  }


  confirmarEliminacion(producto: Producto) {
    this.alertService.alertConfirmacion('Confirmar eliminacion', '¿Quiere eliminar este producto?', 'Si', () => {
      if (producto.imgUrlsRef && producto.imgUrlsRef.length > 0) {
        this.spinnerService.showLoading("Eliminando producto...");
        producto.imgUrlsRef?.forEach(async (imgRef) => {
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

    modal.onDidDismiss().then((result) => {

      if (result.role == 'Guardar') {
        this.database.actualizar(environment.TABLAS.productos, producto, producto.id)?.finally(() => {
        })
      }
    })
    modal.present();

  }

  actualizarImagen(event: Event, producto: any) {
    event.stopPropagation();
    const MAX_MEGABYTE = 0.5;
    const imgName = `${Date.now()}`;

    // Subir y comprimir la nueva imagen
    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE)
      .then(
        (result: string) => {
          // Primero eliminar la imagen existente
          this.storageService.borrarImagen(producto.imgUrlsRef[0]).then(() => {
            // Subir la nueva imagen
            this.storageService.subirImagen(`productos/${imgName}`, result).then((urlImagen) => {
              // Actualizar las referencias en el producto
              const index = producto.imgUrlsRef.indexOf(producto.imgUrlsRef[0]);
              if (index !== -1) {
                producto.imgUrlsRef[index] = `productos/${imgName}`;
                producto.images[index] = urlImagen;
              } else {
                producto.imgUrlsRef.push(`productos/${imgName}`);
                producto.images.push(urlImagen);
              }

              // Actualizar el producto en la base de datos
              if (producto.id) {
                this.database.actualizar(environment.TABLAS.productos, producto, producto.id)?.then((res: any) => {
                  this.toastService.simpleMessage('Exito', 'Imagen actualizada correctamente', ToastColor.success);
                }).catch(err => {
                  this.toastService.simpleMessage('Error', 'No se pudo actualizar la imagen', ToastColor.danger);
                });
              }
            }).catch(err => {
              this.toastService.simpleMessage('Error', 'No se pudo subir la nueva imagen', ToastColor.danger);
            });
          }).catch((err: Error) => {
            this.toastService.simpleMessage('Error', 'No se pudo eliminar la imagen existente', ToastColor.danger);
          });
        },
        (result: string) => {
          // Subir sin comprimir si falla la compresión
          this.storageService.borrarImagen(producto.imgUrlsRef[0]).then(() => {
            this.storageService.subirImagen(`productos/${imgName}`, result).then((urlImagen) => {
              const index = producto.imgUrlsRef.indexOf(producto.imgUrlsRef[0]);
              if (index !== -1) {
                producto.imgUrlsRef[index] = `productos/${imgName}`;
                producto.images[index] = urlImagen;
              } else {
                producto.imgUrlsRef.push(`productos/${imgName}`);
                producto.images.push(urlImagen);
              }

              if (producto.id) {
                this.database.actualizar(environment.TABLAS.productos, producto, producto.id)?.then((res: any) => {
                  this.toastService.simpleMessage('Exito', 'Imagen actualizada correctamente', ToastColor.success);
                }).catch(err => {
                  this.toastService.simpleMessage('Error', 'No se pudo actualizar la imagen', ToastColor.danger);
                });
              }
            }).catch(err => {
              this.toastService.simpleMessage('Error', 'No se pudo subir la nueva imagen', ToastColor.danger);
            });
          }).catch(err => {
            this.toastService.simpleMessage('Error', 'No se pudo eliminar la imagen existente', ToastColor.danger);
          });
        }
      );
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

    if (producto) {
      console.log("MOSTRAR ", producto)
      let productosMostradosAntesDeEscanear = this.funcionesUtiles.clonarObjeto(this.productosAMostrar);
      this.productosAMostrar = [producto];
      setTimeout(() => {
        const inicio = this.productosAMostrar.length;
        const fin = inicio + this.cantidadPorPagina;
        this.productosAMostrar = this.funcionesUtiles.clonarObjeto(this.productos).slice(inicio, fin);
      }, 10000);
    }
  }


  async actualizarPrecio(e: Event, producto: Producto) {
    e.stopPropagation();
    console.log(producto)
    let modal = await this.modalController.create({
      component: ActualizadorDePrecioProductoComponent,
      componentProps: {
        producto,
        loggedUser: this.loggedUser,
        precioDolarBlue: this.precioDolarBlue,
        ruta: '/lista-productos'
      }
    })
    modal.onDidDismiss().then((result: any) => {
      console.log(`result `, result);
      if (result.role == 'actualizado') {
        this.ionViewWillEnter();
      }
    })
    modal.present();
    // producto.costo = (productoForm.costo / this.precioDolarBlue) || 0,

  }

}
