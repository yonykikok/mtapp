
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { boleta } from 'src/app/pages/mis-reparaciones/mis-reparaciones.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { reparacionShortMessage } from 'src/app/services/info-compartida.service';
import { boleta_estados, listaDeEstadosBoletas, reparacionIconName } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss'],
})
export class DetalleReparacionComponent implements OnInit {
  editarDetalle = false;
  ruta: string = '';
  mostrarHistorial = false;
  modoEditar = false;
  reparacion!: boleta;
  mostrarImgBoleta = false;
  estadosPosibles: any[] = [];
  estadoSeleccionado?: any;
  loggedUser!: User;

  imagenGradosRotada = 0;
  constructor(private alertController: AlertController,
    private alertService: AlertService,
    private actionSheetController: ActionSheetController,
    private database: DataBaseService,
    private toastService: ToastService,
    public funcionesUtiles:FuncionesUtilesService) {

  }

  ngOnInit() {
    //console.log(this.reparacion)
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
            //console.log(this.loggedUser)
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
            console.log(this.reparacion);
            if (!this.reparacion.historial) {
              this.reparacion.historial = [cambioDeEstado]
            } else {
              this.reparacion.historial.push(cambioDeEstado);
            };
            //console.log(this.reparacion)
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


  solicitarConfirmacion(event: any, reparacion: boleta) {
    //console.log("se")
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
            //console.log('Acción cancelada');
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
    //console.log("entra")
    this.alertService.mostrarAlertaConTextPrompt(`Actualizar ${nombre}`, `Ingresa el nuevo ${nombre}`, 'Cancelar', 'Actualizar', (input: any) => {
      this.reparacion[campo] = input.valor;
      //console.log("Actualizamos", this.reparacion);

      if (!this.reparacion || !this.reparacion.id) return //TODO:informar
      this.database.actualizar(environment.TABLAS.boletasReparacion, this.reparacion, this.reparacion.id)
        ?.then(() => {
          this.toastService.simpleMessage('Exito', `Se cambio el ${campo} con exito`, ToastColor.success);
        }).catch((err: Error) => {
          this.toastService.simpleMessage('Error', `No se pudo cambiar el ${campo}`, ToastColor.danger);

        });
    }, () => {

      //console.log("Cancelo");
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
}
