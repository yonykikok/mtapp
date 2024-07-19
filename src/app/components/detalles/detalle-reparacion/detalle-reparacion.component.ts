
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';
import { User } from 'src/app/clases/user';
import { boleta, boletaHistorialEstado } from 'src/app/pages/mis-reparaciones/mis-reparaciones.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { reparacionShortMessage } from 'src/app/services/info-compartida.service';
import { boleta_estados, listaDeEstadosBoletas, reparacionIconName } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss'],
})
export class DetalleReparacionComponent implements OnInit {
  subiendoImagen: boolean = false;
  editarDetalle = false;
  ruta: string = '';
  mostrarHistorial = false;
  modoEditar = false;
  reparacion!: boleta;
  estadosPosibles: any[] = [];
  estadoSeleccionado?: any;
  loggedUser!: User;

  imagenGradosRotada = 0;
  constructor(private alertController: AlertController,
    private alertService: AlertService,
    private actionSheetController: ActionSheetController,
    private database: DataBaseService,
    private imageCompress: NgxImageCompressService,
    private toastService: ToastService,
    public funcionesUtiles: FuncionesUtilesService,
    private storageService: StorageService,
    private spinnerService: SpinnerService) {

  }

  ngOnInit() {

    this.getOpcionesEstadoDisponibles();


  }

  getOpcionesEstadoDisponibles(): void {

    const opcionesPorEstado: { [key: string]: string[] } = {

      [boleta_estados.PENDIENTE]: [boleta_estados.EN_REVISION, boleta_estados.CANCELADO_POR_EL_USUARIO, boleta_estados.EN_PROCESO],
      [boleta_estados.EN_REVISION]: [boleta_estados.PARA_NOTIFICAR, boleta_estados.CANCELADO_POR_EL_USUARIO, boleta_estados.PAUSADO],
      [boleta_estados.CANCELADO_POR_EL_USUARIO]: [boleta_estados.PENDIENTE, boleta_estados.PARA_ENTREGAR],
      [boleta_estados.EN_PROCESO]: [boleta_estados.PAUSADO, boleta_estados.CANCELADO_POR_EL_USUARIO, boleta_estados.NO_REPARADO, boleta_estados.REPARADO, boleta_estados.PARA_NOTIFICAR],
      [boleta_estados.ESPERADO_RESPUESTA]: [boleta_estados.PAUSADO, boleta_estados.CANCELADO_POR_EL_USUARIO, boleta_estados.EN_PROCESO],
      [boleta_estados.PAUSADO]: [boleta_estados.EN_PROCESO, boleta_estados.CANCELADO_POR_EL_USUARIO],
      [boleta_estados.NO_REPARADO]: [boleta_estados.PARA_NOTIFICAR],
      [boleta_estados.REPARADO]: [boleta_estados.PARA_NOTIFICAR],
      [boleta_estados.PARA_NOTIFICAR]: [boleta_estados.ESPERADO_RESPUESTA, boleta_estados.PARA_ENTREGAR],
      [boleta_estados.PARA_ENTREGAR]: [boleta_estados.RETIRADO, boleta_estados.PENDIENTE],
      [boleta_estados.RETIRADO]: [],

    };

    const estadosCoincidentes = listaDeEstadosBoletas.filter((estado) => {
      let retorno;
      if (this.reparacion) {
        retorno = opcionesPorEstado[this.reparacion.estado.toUpperCase()].includes(estado.variable.toUpperCase())
      }
      return retorno;
    });


    this.estadosPosibles = estadosCoincidentes || [];
  }
  getIconName(): string {
    let retorno = reparacionIconName.PENDIENTE;
    if (this.reparacion) {
      const estado = this.reparacion.estado.toUpperCase() as keyof typeof reparacionIconName;
      if (estado in reparacionIconName) {
        retorno = reparacionIconName[estado];
      }
    }
    return retorno;
  }



  async cambiarEstado() {

    const alert = await this.alertController.create({
      header: 'Describe el motivo del cambio de estado',
      inputs: [
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Describe el motivo del cambio de estado'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.modoEditar = false;
            this.estadoSeleccionado = this.reparacion.estado;
            this.getOpcionesEstadoDisponibles();
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            //
            let cambioDeEstado = {
              estadoAnterior: this.reparacion.estado,
              estadoActual: this.estadoSeleccionado,
              fecha: new Date().toISOString(),
              modificadoPor: {
                id: this.loggedUser.uid,
                displayName: this.loggedUser.displayName ? this.loggedUser.displayName : '',
              },
              detalle: data.descripcion
            }

            this.modoEditar = false;
            this.reparacion.estado = this.estadoSeleccionado;
            this.reparacion.fechaUltimoCambioDeEstado = Date.now()

            if (!this.reparacion.historial) {
              this.reparacion.historial = [cambioDeEstado]
            } else {
              this.reparacion.historial.push(cambioDeEstado);
            };
            //
            this.getOpcionesEstadoDisponibles();//TODO: guardar en la db.

            if (!this.reparacion || !this.reparacion.id) return //TODO:informar
            this.database.actualizar(environment.TABLAS.boletasReparacion, this.reparacion, this.reparacion.id)
              ?.then((res: any) => this.toastService.simpleMessage('Exito', `Se paso el estado a ${this.estadoSeleccionado}`, ToastColor.success))
              .catch((err: Error) => this.toastService.simpleMessage('Error', `Hubo un error al cambiar el estado: ${err.message}`, ToastColor.danger));
          }

        }
      ]
    });

    await alert.present();
  }


  obtenerMensajeDelEstado(estado: boleta_estados) {
    return reparacionShortMessage[estado];
  }

  confirmarEliminacionDeImagen(reparacion: boleta, estado: boletaHistorialEstado, index: number) {
    this.alertService.alertConfirmacion('Confirmar eliminacion', '¿Quiere borrar la imagen?', 'Si', () => {
      this.spinnerService.showLoading('Borrando img...');
      if (estado.images && estado.imgUrlsRef) {
        this.storageService.borrarImagen(estado.imgUrlsRef[index]).then(res => {
          if (res) {
            estado.images?.splice(index, 1);
            estado.imgUrlsRef?.splice(index, 1);

            if (reparacion.id) {
              this.database.actualizar(environment.TABLAS.boletasReparacion, reparacion, reparacion.id)?.finally(() => {
                this.spinnerService.stopLoading();
              });
            }
          }
          console.log(res)
        });
      }
    })
  }

  solicitarConfirmacion(event: any, reparacion: boleta) {
    event.stopPropagation();
    this.alertService.alertConfirmacion('Confirmación', '¿Quiere enviarle un mensaje al cliente en este momento?', 'Si', this.presentActionSheet.bind(this, reparacion));
  }

  abrirWhatsApp(reparacion: any, mensaje: string) {
    const url = `https://api.whatsapp.com/send?phone=+54${reparacion.telefono}&text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_system');
  }

  async presentActionSheet(reparacion: boleta) {
    let mensaje = `Hola, ¿qué tal?, te escribo por el equipo ${reparacion.modelo} de la boleta (${reparacion.nroBoleta})`; // Mensaje predeterminado para el cliente;
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Elija una opción',
      buttons: [
        {
          text: 'Mensaje normal',
          handler: () => {
            this.abrirWhatsApp(reparacion, mensaje)
          }
        },
        // {
        //   text: 'Informar estado',
        //   handler: () => {
        //     mensaje=`Hola, ¿qué tal?, te escribo por el equipo de la boleta (${reparacion.nroBoleta}) `;
        //     this.abrirWhatsApp(reparacion, mensaje)
        //   }
        // },
        {
          text: 'Recordatorio de retiro',
          handler: () => {
            mensaje = `Hola, ¿qué tal?, te escribo por el equipo de la boleta (${reparacion.nroBoleta}) dejado el dia de la fecha ---, 
            le informamos nuevamente que el equipo esta listo para ser retirado desde la fecha ---`;
            this.abrirWhatsApp(reparacion, mensaje)
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Lógica adicional para la acción cancelada
          }
        }
      ]
    });

    await actionSheet.present();
  }




  girarImagen(grados: number) {
    return this.imagenGradosRotada += grados;
  }

  mostrarFormularioEditarinformacion(nombre: string, campo: string) {
    this.alertService.mostrarAlertaConTextPrompt(`Actualizar ${nombre}`, `Ingresa el nuevo ${nombre}`, 'Cancelar', 'Actualizar', (input: any) => {
      this.reparacion[campo] = input.valor;

      if (!this.reparacion || !this.reparacion.id) return //TODO:informar
      this.database.actualizar(environment.TABLAS.boletasReparacion, this.reparacion, this.reparacion.id)
        ?.then(() => {
          this.toastService.simpleMessage('Exito', `Se cambio el ${campo} con exito`, ToastColor.success);
        }).catch((err: Error) => {
          this.toastService.simpleMessage('Error', `No se pudo cambiar el ${campo}`, ToastColor.danger);

        });
    }, () => {

    })
  }

  async mostrarEditarDetalle(estado: any) {
    const alert = await this.alertController.create({
      header: 'Editar Detalle',
      inputs: [
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Escribe el nuevo detalle.',
          value: estado.detalle
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            estado.detalle = data.descripcion;
            if (!this.reparacion || !this.reparacion.id) return //TODO:informar

            this.database.actualizar(environment.TABLAS.boletasReparacion, this.reparacion, this.reparacion.id)
              ?.then((res: any) => this.toastService.simpleMessage('Exito', `Se actualizo la informacion del detalle`, ToastColor.success))
              .catch((err: Error) => this.toastService.simpleMessage('Error', `Hubo un error al actualizar el detalle: ${err.message}`, ToastColor.danger));
          }

        }
      ]
    });

    await alert.present();
  }

  async solicitarConfirmacionEliminar(reparacion: boleta, estado: boletaHistorialEstado) {
    this.alertService.alertConfirmacion('Confirmacion', '¿Seguro de eliminar este estado?', 'Si', () => {
      this.spinnerService.showLoading('Eliminando estado...');
      if (reparacion.id && reparacion.historial) {

        const index = reparacion.historial.findIndex(item => item.fecha === estado.fecha);

        if (index !== -1) {
          if (estado.imgUrlsRef) {
            let imgUrlRefCopia = this.funcionesUtiles.clonarObjeto(estado.imgUrlsRef);
            imgUrlRefCopia.forEach(async (imgRef: any) => {
              try {
                let result = await this.storageService.borrarImagen(imgRef);


              } catch (error) {
                console.error(error);
              }
            });
          }

          reparacion.estado = estado.estadoAnterior;
          reparacion.historial.splice(index, 1);
        }

        this.database.actualizar(environment.TABLAS.boletasReparacion, reparacion, reparacion.id)?.finally(() => {
          this.spinnerService.stopLoading();
        });
      }

    });
  }

  agregarImagen(reparacion: boleta, estado: boletaHistorialEstado) {
    const MAX_MEGABYTE = 0.5;
    let posicionDisponible = this.obtenerPosicionDisponibles(estado);
    console.log(posicionDisponible);
    if (posicionDisponible != undefined) {
      let imgName = `${new Date(estado.fecha).getTime()}-${reparacion.dniCliente}-${reparacion.nroBoleta}-${posicionDisponible}`;
      this.subiendoImagen = true;
      this.imageCompress
        .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
        .then(
          (result: string) => {//caso de que comprima
            this.subirImagen(reparacion, estado, `estados_reparacion/`, imgName, result);
          },
          (result: string) => {//caso de que NO comprima
            this.subirImagen(reparacion, estado, `estados_reparacion/`, imgName, result);
          });
    }
  }


  subirImagen(reparacion: boleta, estado: boletaHistorialEstado, imgPath: string, imgName: string, imgBase64: string) {

    this.storageService.subirImagen(imgPath + imgName, imgBase64).then((urlImagen) => {

      let urlRef = imgPath + imgName;

      if (urlImagen) {
        if (!estado.images || !estado.imgUrlsRef) {
          estado.imgUrlsRef = [];
          estado.images = [];
        }
        estado.imgUrlsRef.push(urlRef);
        estado.images.push(urlImagen);
      }
      if (reparacion.id) {
        this.database.actualizar(environment.TABLAS.boletasReparacion, reparacion, reparacion.id)?.then((res: any) => {
          // this.spinnerService.stopLoading();
          this.toastService.simpleMessage('Existo', 'Nueva imagen añadida', ToastColor.success);

        }).catch(err => {
          this.toastService.simpleMessage('Error', 'No se pudo agregar la imagen', ToastColor.danger);
        }).finally(() => {
          this.subiendoImagen = false;
        })
      }
    }).catch(err => {
      this.toastService.simpleMessage('Error', 'al subir la image ocurrio un error ("equipos disponibles")', ToastColor.danger);
    });
  }

  obtenerPosicionDisponibles(estado: boletaHistorialEstado) {
    let posicionesDiponibles: number[] = [];
    const imagenesRefSinRepetidos = Array.from(new Set(estado.imgUrlsRef));
    let posiblesPosiciones = [0, 1];

    posiblesPosiciones.forEach(posicion => {
      let existe = false;
      imagenesRefSinRepetidos.forEach(imgRef => {

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

  mostrarImagen(img: string) {
    this.funcionesUtiles.mostrarImagenCompleta(img, this.actualizarImagen.bind(this, this.reparacion));
  }

  async actualizarImagen(boleta: any, event?: Event) {///NO IMPLEMENTADO AUN ACA
    if (event) {
      event.stopPropagation();
    }
    let ref = await this.storageService.obtenerReferenciaDeImagenPorUrl(boleta.images[0]);
    // return;
    const MAX_MEGABYTE = 0.5;
    let hoy = new Date(Date.now());

    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[hoy.getMonth()];
    let year = hoy.getFullYear();

    const imgName = ref.fullPath ? ref.fullPath : `boletas/${month}${year}-${boleta.nroBoleta}-${boleta.dniCliente}`;
    if (!boleta.imgUrlsRef) {
      boleta.imgUrlsRef = [imgName]
    }

    // Subir y comprimir la nueva imagen
    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE)
      .then(
        (result: string) => {
          this.spinnerService.showLoading('Cargando imagen');
          // Primero eliminar la imagen existente
          this.storageService.borrarImagen(boleta.imgUrlsRef[0]).then(() => {
            // Subir la nueva imagen
            this.storageService.subirImagen(`boletas/${imgName}`, result).then((urlImagen) => {
              // Actualizar las referencias en el boleta
              const index = boleta.imgUrlsRef.indexOf(boleta.imgUrlsRef[0]);
              if (index !== -1) {
                boleta.imgUrlsRef[index] = `boletas/${imgName}`;
                boleta.images[index] = urlImagen;
              } else {
                boleta.imgUrlsRef.push(`boletas/${imgName}`);
                boleta.images.push(urlImagen);
              }

              // Actualizar el boleta en la base de datos
              if (boleta.id) {
                this.database.actualizar(environment.TABLAS.boletasReparacion, boleta, boleta.id)?.then((res: any) => {
                  this.toastService.simpleMessage('Exito', 'Imagen actualizada correctamente', ToastColor.success);
                }).catch(err => {
                  this.toastService.simpleMessage('Error', 'No se pudo actualizar la imagen', ToastColor.danger);
                }).finally(() => {
                  this.spinnerService.stopLoading();
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
          this.spinnerService.showLoading('Cargando imagen');
          // Subir sin comprimir si falla la compresión
          this.storageService.borrarImagen(boleta.imgUrlsRef[0]).then(() => {
            this.storageService.subirImagen(`boletas/${imgName}`, result).then((urlImagen) => {
              const index = boleta.imgUrlsRef.indexOf(boleta.imgUrlsRef[0]);
              if (index !== -1) {
                boleta.imgUrlsRef[index] = `boletas/${imgName}`;
                boleta.images[index] = urlImagen;
              } else {
                boleta.imgUrlsRef.push(`boletas/${imgName}`);
                boleta.images.push(urlImagen);
              }

              if (boleta.id) {
                this.database.actualizar(environment.TABLAS.boletasReparacion, boleta, boleta.id)?.then((res: any) => {
                  this.toastService.simpleMessage('Exito', 'Imagen actualizada correctamente', ToastColor.success);
                }).catch(err => {
                  this.toastService.simpleMessage('Error', 'No se pudo actualizar la imagen', ToastColor.danger);
                }).finally(() => {
                  this.spinnerService.stopLoading();
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
}
