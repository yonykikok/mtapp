import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { FormEquipoDisponibleComponent } from 'src/app/components/forms/form-equipo-disponible/form-equipo-disponible.component';
import { FormEspecificacionesEquipoComponent } from 'src/app/components/forms/form-especificaciones-equipo/form-especificaciones-equipo.component';
import { UploadImagesComponent } from 'src/app/components/upload-images/upload-images.component';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { EquipoDisponible, ReservaEquipo } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipos-disponibles',
  templateUrl: './equipos-disponibles.page.html',
  styleUrls: ['./equipos-disponibles.page.scss'],
})
export class EquiposDisponiblesPage implements OnInit {
  mostrarConfirmacionDeVenta: boolean = false;
  equipos!: EquipoDisponible[];
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


  constructor(private modalController: ModalController,
    private alertService: AlertService,
    private database: DataBaseService,
    private alertController: AlertController,
    private funcionesUtiles: FuncionesUtilesService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.database.obtenerTodos(environment.TABLAS.equipos_disponibles).subscribe(listRef => {
      this.equipos = listRef.map((equipoRef: any) => {
        let equipoDisponible = equipoRef.payload.doc.data() as EquipoDisponible;
        equipoDisponible['id'] = equipoRef.payload.doc.id;
        equipoDisponible['mostrarImagenes'] = false;

        return equipoDisponible;
      });
      console.log(this.equipos)
    });
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
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: FormEquipoDisponibleComponent,
        componentProps: {
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
          console.log('Cancelado');
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

    modal.onDidDismiss().then(result => {
      if (result.role == 'guardar') {
        this.database.actualizar(environment.TABLAS.equipos_disponibles, { ...equipo, especificaciones: result.data }, equipo.id);
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
          console.log('Cancelado');
        }
      }, {
        text: 'Confirmar', handler: (data) => {
          this.equipoSeleccionado.precio = data.precio;
          console.log(data)
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
          console.log('Cancelado');
        }
      }, {
        text: 'Confirmar', handler: (data) => {
          this.mostrarConfirmacionDeVenta = true;

          this.equipoSeleccionado.dni = data.dni;
          console.log(data)
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
      console.log(this.equipoSeleccionado)
      console.log(nuevaVenta)

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
      console.log(equipo)
      equipo.imgUrlsRef?.forEach(async (imgRef) => {
        try {
          let result = await this.storageService.borrarImagen(imgRef);
          console.log(result);

        } catch (error) {
          console.error(error);
        } finally {
          this.database.eliminar(environment.TABLAS.equipos_disponibles, equipo.id).finally(() => {
            this.spinnerService.stopLoading();
          });
        }
      });

      this.database.eliminar(environment.TABLAS.equipos_disponibles, equipo.id).then(res => {
        console.log(res);
      });
    })
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
    console.log(equipo)
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
    console.log(data);
    let imgUrls: string[] = [];
    let imgUrlsRef: string[] = [];//referencia para eliminar
    let contador = 0;
    data.images.forEach((imgBase64, index) => {
      if (!imgBase64.includes("https://firebasestorage")) {
        let posicionDisponible = Number(data.posicionesDiponibles.shift());
        this.storageService.subirImagenEquiposVenta(imgPath + `${this.equipoSeleccionado.fecha}-${this.equipoSeleccionado.marca}-${this.equipoSeleccionado.imei}-${posicionDisponible}`, imgBase64).then((urlImagen) => {
          imgUrls.push(urlImagen as string);
          imgUrlsRef.push(imgPath + `${this.equipoSeleccionado.fecha}-${this.equipoSeleccionado.marca}-${this.equipoSeleccionado.imei}-${posicionDisponible}`);//referencia para eliminar
          contador++;

          if (index == data.images.length - 1) {
            this.equipoSeleccionado.images = imgUrls;
            this.equipoSeleccionado.imgUrlsRef = imgUrlsRef;//referencia para eliminar
            console.log(`imgUrls: `, imgUrls)
            console.log(`imgUrlsRef: `, imgUrlsRef)

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
}

