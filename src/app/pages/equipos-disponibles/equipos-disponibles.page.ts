import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { User } from 'src/app/clases/user';
import { FormEquipoDisponibleComponent } from 'src/app/components/forms/form-equipo-disponible/form-equipo-disponible.component';
import { FormEspecificacionesEquipoComponent } from 'src/app/components/forms/form-especificaciones-equipo/form-especificaciones-equipo.component';
import { UploadImagesComponent } from 'src/app/components/upload-images/upload-images.component';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { EquipoDisponible, ReservaEquipo, roles } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { EspecificacionesEquipo } from '../dashboard/dashboard.page';

@Component({
  selector: 'app-equipos-disponibles',
  templateUrl: './equipos-disponibles.page.html',
  styleUrls: ['./equipos-disponibles.page.scss'],
})
export class EquiposDisponiblesPage implements OnInit {
  mostrarConfirmacionDeVenta: boolean = false;
  equipos!: EquipoDisponible[];
  equiposAMostrar!: EquipoDisponible[];
  equipoSeleccionado!: EquipoDisponible;
  isActionSheetOpen = false;
  accesoriosSeleccionados = [];
  modificarAccesorios = false;
  actionSheetButtons = [
    {
      text: 'Completar',
      icon: 'checkmark',
      handler: () => this.realizarAccion('completar'),
    },
    {
      text: 'Modificar',
      icon: 'create',
      handler: () => this.realizarAccion('modificar'),
    },
    {
      text: 'Suspender disponibilidad',
      icon: 'time-outline',
      handler: () => this.realizarAccion('suspender'),
    },
    {
      text: 'Eliminar',
      role: 'destructive',
      icon: 'trash',
      handler: () => this.realizarAccion('delete'),
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => this.realizarAccion('cancel'),
    },
  ];

  roles = roles;
  loggedUser!: User;
  constructor(public funcionesUtilesService: FuncionesUtilesService,
    private authService: AuthService,
    private modalController: ModalController,
    private alertService: AlertService,
    private database: DataBaseService,
    private alertController: AlertController,
    private funcionesUtiles: FuncionesUtilesService,
    private imageCompress: NgxImageCompressService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.database.obtenerTodos(environment.TABLAS.equipos_disponibles).subscribe(listRef => {
      this.equipos = listRef.map((equipoRef: any) => {
        let equipoDisponible = equipoRef.payload.doc.data() as EquipoDisponible;
        equipoDisponible['id'] = equipoRef.payload.doc.id;
        equipoDisponible['mostrarImagenes'] = false;

        return equipoDisponible;
      });
      this.equiposAMostrar = this.funcionesUtiles.clonarObjeto(this.equipos);
      this.ordenarPorPrecio(true);
    });
  }


  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }
  realizarAccion(accion: string) {
    // Implementa las acciones correspondientes para cada botón
    switch (accion) {
      case 'completar':
        // Lógica para la acción Completar
        this.confirmarElCompletadoDeinformacion(this.equipoSeleccionado);
        break;
      case 'modificar':
        // Lógica para la acción Modificar
        this.openDialog(true, this.equipoSeleccionado);
        break;
      case 'suspender':
        // Lógica para la acción suspender
        this.confirmarSuspencion(this.equipoSeleccionado);
        break;
      case 'delete':
        this.confirmarEliminacion(this.equipoSeleccionado);
        // Lógica para la acción Eliminar
        break;
      case 'cancel':
        // Lógica para la acción Cancelar
        break;
      default:
        // Manejar otros casos si es necesario
        break;
    }

    // Cierra el actionSheet después de realizar la acción
    this.setOpen(false);
  }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  async openDialog(modoModificarEquipo: boolean, equipoSeleccionado?: EquipoDisponible) {

    try {
      const modal = await this.modalController.create({
        component: FormEquipoDisponibleComponent,
        componentProps: {
          equipoDisponible: equipoSeleccionado,
          modoModificarEquipo
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  async confirmarElCompletadoDeinformacion(equipo: EquipoDisponible) {
    this.alertService.alertConfirmacion('Confirmación', '¿Quiere completar la informacion del dispositivo ahora?', 'Si, Completar', () => {
      this.abrirModal(equipo);
    });
  }
  async mostrarAlertaReserva(equipo: EquipoDisponible) {
    const alert = await this.alertController.create({
      header: 'Confirmar Reserva',
      inputs: [{ name: 'adelanto', type: 'number', placeholder: 'Adelanto', }, { name: 'dni', type: 'text', placeholder: 'DNI' }],
      buttons: [{
        text: 'Cancelar', role: 'cancel', cssClass: 'secondary', handler: () => {

        }
      }, {
        text: 'Confirmar', handler: (data) => {
          this.spinnerService.showLoading('Reservando equipo');
          // Aquí puedes trabajar con los datos ingresados
          let reserva: ReservaEquipo = {
            dni: data.dni,
            adelanto: data.adelanto,
            fecha: Date.now(),
            reservado: true
          }
          equipo.reserva = reserva;
          this.database.actualizar(environment.TABLAS.equipos_disponibles, equipo, equipo.id)?.finally(() => {
            this.spinnerService.stopLoading();
          })
        }
      }
      ]
    });

    await alert.present();
  }

  async abrirModal(equipo: EquipoDisponible) {
    const modal = await this.modalController.create({
      component: FormEspecificacionesEquipoComponent,
      componentProps: {
        equipo
      }
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.role == 'guardar') {
        this.database.actualizar(environment.TABLAS.equipos_disponibles, { ...equipo, especificaciones: result.data }, equipo.id);

        try {
          const res: any = await this.database.obtenerPorId(environment.TABLAS.especificacionesDeEquipos, equipo.marca.toLowerCase());
          console.log(res)

          let especificacionesExistentePorMarca: EspecificacionesEquipo[] = res.payload ? res.payload.data().especificaciones || [] : [];

          especificacionesExistentePorMarca.push({
            marca: equipo.marca,
            modelo: equipo.modelo,
            especificaciones: result.data
          });

          console.log(especificacionesExistentePorMarca);
          await this.database.actualizar(
            environment.TABLAS.especificacionesDeEquipos,
            { especificaciones: especificacionesExistentePorMarca },
            equipo.marca
          );

        } catch (error) {
          console.error('Error al actualizar las especificaciones:', error);
        }


        // this.database.actualizar(environment.TABLAS.equipos_disponibles, { ...equipo, especificaciones: result.data }, equipo.id);
      }
    })

    await modal.present();
  }
  async actualizarPrecio(equipo: EquipoDisponible) {
    this.equipoSeleccionado = this.funcionesUtiles.clonarObjeto(equipo);
    const alert = await this.alertController.create({
      header: 'Confirma el nuevo precio',
      inputs: [{ name: 'precio', type: 'number', placeholder: 'Precio de venta' }],
      buttons: [{
        text: 'Cancelar', role: 'cancel', cssClass: 'secondary', handler: () => {

        }
      }, {
        text: 'Confirmar', handler: (data) => {
          this.equipoSeleccionado.precio = data.precio;

        }
      }
      ]
    });

    await alert.present();
  }
  async venderEquipo(equipo: EquipoDisponible) {
    this.equipoSeleccionado = this.funcionesUtiles.clonarObjeto(equipo);
    const alert = await this.alertController.create({
      header: 'Confirmar Venta',
      inputs: [{ name: 'dni', type: 'text', placeholder: 'DNI del comprador' }],
      buttons: [{
        text: 'Cancelar', role: 'cancel', cssClass: 'secondary', handler: () => {

        }
      }, {
        text: 'Confirmar', handler: (data) => {
          this.mostrarConfirmacionDeVenta = true;

          this.equipoSeleccionado.dni = data.dni;

        }
      }
      ]
    });

    await alert.present();
  }
  confirmarVenta() {
    this.alertService.alertConfirmacion('Confirmar venta', '¿Seguro de proceder con la venta?', 'Si', () => {
      let nuevaVenta = this.funcionesUtiles.clonarObjeto(this.equipoSeleccionado);
      delete nuevaVenta.id;
      nuevaVenta.fecha = Date.now();

      this.database.crear(environment.TABLAS.equipos_vendidos, nuevaVenta).then(res => {
        this.database.eliminar(environment.TABLAS.equipos_disponibles, this.equipoSeleccionado.id).then(res => {
          this.mostrarConfirmacionDeVenta = false;
        });
      });
    })
  }

  confirmarEliminacion(equipo: EquipoDisponible) {
    this.alertService.alertConfirmacion('Confirmar eliminacion', '¿Quiere eliminar este equipo?', 'Si', () => {
      this.spinnerService.showLoading("Eliminando venta...");
      equipo.imgUrlsRef?.forEach(async (imgRef) => {
        try {
          let result = await this.storageService.borrarImagen(imgRef);


        } catch (error) {
          console.error(error);
        } finally {
          this.database.eliminar(environment.TABLAS.equipos_disponibles, equipo.id).finally(() => {
            this.spinnerService.stopLoading();
          });
        }
      });

      this.database.eliminar(environment.TABLAS.equipos_disponibles, equipo.id).then(res => {

      });
    })
  }

  mostrarMotivo(equipo: EquipoDisponible) {
    this.alertService.alertConfirmacion('Motivo de suspension', equipo.motivoSuspension ? equipo.motivoSuspension : 'Sin aclaracion', 'Habilitar',
      () => {
        equipo.motivoSuspension = '';
        equipo.suspendido = false;
        this.spinnerService.showLoading('Habilitando equipo...');

        this.database.actualizar(environment.TABLAS.equipos_disponibles, equipo, equipo.id)?.finally(() => {
          this.spinnerService.stopLoading();
        });
      })
    // this.alertService.alertSinAccion('Motivo de suspension', equipo.motivoSuspension ? equipo.motivoSuspension : 'Sin aclaracion', 'OK');
  }
  async confirmarSuspencion(equipo: EquipoDisponible) {
    const alert = await this.alertController.create({
      header: 'Confirmar suspensión',
      subHeader: '¿Quiere suspender este equipo?',
      message: 'Explica el motivo',
      inputs: [
        {
          name: 'motivo',
          type: 'text',
          placeholder: 'Motivo de la suspensión'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirmación de suspensión cancelada');
          }
        }, {
          text: 'Confirmar',
          handler: (data) => {
            this.spinnerService.showLoading("Suspendiendo equipo...");
            equipo.suspendido = true;
            equipo.motivoSuspension = data.motivo;
            //@ts-ignore
            this.database.actualizar(environment.TABLAS.equipos_disponibles, equipo, equipo.id).then(res => {

            }).finally(() => {
              this.spinnerService.stopLoading();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  solicitarConfirmacionCancelarReserva(equipo: EquipoDisponible) {
    this.alertService.alertConfirmacion('Confirmación', '¿Seguro de cancelar esta reserva?', 'Si', () => {
      this.spinnerService.showLoading('Cancelando reserva');
      equipo.reserva = {
        adelanto: 0,
        dni: null,
        fecha: null,
        reservado: false
      }
      // equipo.modelo = "J7 prime 32312"
      // delete equipo.reserva;
      this.database.actualizar(environment.TABLAS.equipos_disponibles, equipo, equipo.id)?.finally(() => {
        this.spinnerService.stopLoading();
      })
    })
  }
  cargarNuevosAccesorios(equipo: EquipoDisponible) {
    equipo.accesorios = this.accesoriosSeleccionados;
    this.modificarAccesorios = false;
  }

  async abrirModalImagenes() {
    const modal = await this.modalController.create({
      component: UploadImagesComponent,
      componentProps: {
        imagenes: [...this.equipoSeleccionado.images],
        imagenesRef: [...this.equipoSeleccionado.imgUrlsRef],
        isModal: true
        // Puedes pasar propiedades adicionales al componente si es necesario
      },
    });

    modal.onDidDismiss().then(res => {

      let data: {
        images: string[]
        imagesRef: string[]
        posicionesDiponibles: number[]
      } = res.data;
      this.uploadImages(data, `equipos_disponibles/`);

    })
    await modal.present();
  }


  uploadImages(data: { images: string[], imagesRef: string[], posicionesDiponibles: number[] }, imgPath: string) {

    let imgUrls: string[] = [];
    let imgUrlsRef: string[] = [];//referencia para eliminar
    let contador = 0;
    data.images.forEach((imgBase64, index) => {
      if (!imgBase64.includes("https://firebasestorage")) {
        let posicionDisponible = Number(data.posicionesDiponibles.shift());
        this.storageService.subirImagen(imgPath + `${this.equipoSeleccionado.fecha}-${this.equipoSeleccionado.marca}-${this.equipoSeleccionado.imei}-${posicionDisponible}`, imgBase64).then((urlImagen) => {
          imgUrls.push(urlImagen as string);
          imgUrlsRef.push(imgPath + `${this.equipoSeleccionado.fecha}-${this.equipoSeleccionado.marca}-${this.equipoSeleccionado.imei}-${posicionDisponible}`);//referencia para eliminar
          contador++;

          if (index == data.images.length - 1) {
            this.equipoSeleccionado.images = imgUrls;
            this.equipoSeleccionado.imgUrlsRef = imgUrlsRef;//referencia para eliminar

            this.database.actualizar(environment.TABLAS.equipos_disponibles, this.equipoSeleccionado, this.equipoSeleccionado.id)?.then((res: any) => {
              // this.spinnerService.stopLoading();
              this.toastService.simpleMessage('Existo', 'Nuevo equipo añadido a disponibles', ToastColor.success);

            }).catch(err => {
              this.toastService.simpleMessage('Error', 'No se pudo agregar el equipo a "equipos disponibles"', ToastColor.danger);
            })
          }
        }).catch(err => {
          this.toastService.simpleMessage('Error', 'al subir la image ocurrio un error ("equipos disponibles")', ToastColor.danger);
        });
      } else {
        imgUrls.push(imgBase64);
        imgUrlsRef.push(data.imagesRef[index]);
        if (index == data.images.length - 1) {
          this.equipoSeleccionado.images = imgUrls;
          this.equipoSeleccionado.imgUrlsRef = imgUrlsRef;//referencia para eliminar
          this.database.actualizar(environment.TABLAS.equipos_disponibles, this.equipoSeleccionado, this.equipoSeleccionado.id)?.then((res: any) => {
            // this.spinnerService.stopLoading();
            this.toastService.simpleMessage('Existo', 'Nuevo equipo añadido a disponibles', ToastColor.success);

          }).catch(err => {
            this.toastService.simpleMessage('Error', 'No se pudo agregar el equipo a "equipos disponibles"', ToastColor.danger);
          })
        }
      }

    });

  }

  filtrarProductos(event: any) {
    const valorBusqueda = event.target.value.toLowerCase();
    this.equiposAMostrar = this.equipos.filter((equipo: EquipoDisponible) => {
      // Verificar si el producto contiene el valor de búsqueda
      if (
        equipo.modelo.toLowerCase().includes(valorBusqueda) ||
        equipo.marca.toLowerCase().includes(valorBusqueda) ||
        equipo.especificaciones?.memoria.toString().toLowerCase().includes(valorBusqueda)
      ) {
        return equipo;
      }
      return null;
    });

    this.ordenarPorPrecio(true);

  }
  ordenarPorPrecio(ascendente: boolean = true): void {
    this.equiposAMostrar = this.equiposAMostrar.sort((a: EquipoDisponible, b: EquipoDisponible) => {
      const precioA = a.precio !== undefined ? a.precio : 0;
      const precioB = b.precio !== undefined ? b.precio : 0;

      if (ascendente) {
        return precioA - precioB;
      } else {
        return precioB - precioA;
      }
    });
  }
  mostrarImagen(equipo: EquipoDisponible) {
    this.mostrarImagenCompleta(equipo, (data: any) => {

      let nuevaImagen: string; '';
      let nuevaImagenRef: string; '';
      const MAX_MEGABYTE = 0.5;
      this.imageCompress
        .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
        .then(
          (result: string) => {
            // imgResult = result;
            nuevaImagen = result;
            nuevaImagenRef = equipo.imgUrlsRef[data];
            //
          },
          (result: string) => {
            console.info('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
            // imgResult = result;
            nuevaImagen = result;
            nuevaImagenRef = equipo.imgUrlsRef[data];
            //
          }).finally(() => {
            equipo.images[data] = nuevaImagen;
            equipo.imgUrlsRef[data] = nuevaImagenRef;
            this.spinnerService.showLoading('Actualizando imagen...');
            this.storageService.subirImagen(nuevaImagenRef, nuevaImagen).then(res => {
            }).finally(() => {
              this.spinnerService.stopLoading();
            });
          });

    })
  }

  async mostrarImagenCompleta(equipo: EquipoDisponible, actualizarImagenMethod?: any) {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen: equipo.images[0],
          imagenesArray: equipo.images,
          isModal: true,
          permitirGirarImagen: true,
          mostrarOpcionesIcon: true,
          actualizarImagenMethod
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }
}

