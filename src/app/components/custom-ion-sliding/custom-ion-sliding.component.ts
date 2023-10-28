import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { boleta } from 'src/app/pages/mis-reparaciones/mis-reparaciones.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { boleta_estados, reparacionBgColor, reparacionIconName, reparacionMessage } from 'src/app/services/info-compartida.service';


@Component({
  selector: 'app-custom-ion-sliding',
  templateUrl: './custom-ion-sliding.component.html',
  styleUrls: ['./custom-ion-sliding.component.scss'],
})


export class CustomIonSlidingComponent implements OnInit {
  @Output() mostrarDetalleEvent = new EventEmitter<any>();
  @Input() reparacion!: boleta;
  slidingConfig = {
    iconName: reparacionIconName.PENDIENTE,
    bgColor: reparacionBgColor.PENDIENTE,
    stateMessage: reparacionMessage.PENDIENTE
  }
  slidingOptions: any[] = [];
  slidingOptionsByState = {
    PENDIENTE: {
      text: 'Cancelar', bgColor: reparacionBgColor.PENDIENTE, click: async (reparacion: boleta) => {
        this.alertService.alertConfirmacion('Cancelar Reparacion', 'Estas seguro de querer cancelarla?', "Si", this.cambiarEstadoReparacion.bind(this, reparacion, boleta_estados.CANCELADO_POR_EL_USUARIO));
      }
    },
    EN_REVISION: {
      text: 'En revisión', bgColor: reparacionBgColor.EN_REVISION, click: (reparacion: boleta) => { console.log("En revisión"); }
    },
    CANCELADO_POR_EL_USUARIO: {
      text: 'Cancelado por el usuario', bgColor: reparacionBgColor.CANCELADO_POR_EL_USUARIO, click: (reparacion: boleta) => { console.log("Cancelado por el usuario"); }
    },
    EN_PROCESO: {
      text: 'En proceso', bgColor: reparacionBgColor.EN_PROCESO, click: (reparacion: boleta) => { console.log("En proceso"); }
    },
    ESPERADO_RESPUESTA: {
      text: 'Esperando respuesta', bgColor: reparacionBgColor.ESPERADO_RESPUESTA, click: (reparacion: boleta) => { console.log("Esperando respuesta"); }
    },
    PAUSADO: {
      text: 'Pausado', bgColor: reparacionBgColor.PAUSADO, click: (reparacion: boleta) => { console.log("Pausado"); }
    },
    NO_REPARADO: {
      text: 'No reparado', bgColor: reparacionBgColor.NO_REPARADO, click: (reparacion: boleta) => { console.log("No reparado"); }
    },
    REPARADO: {
      text: 'Reparado', bgColor: reparacionBgColor.REPARADO, click: (reparacion: boleta) => { console.log("Reparado"); }
    },
    PARA_NOTIFICAR: {
      text: 'Para notificar', bgColor: reparacionBgColor.PARA_NOTIFICAR, click: (reparacion: boleta) => { console.log("Para notificar"); }
    },
    PARA_ENTREGAR: {
      text: 'Para entregar', bgColor: reparacionBgColor.PARA_ENTREGAR, click: (reparacion: boleta) => { console.log("Para entregar"); }
    },
    RETIRADO: {
      text: 'Retirado', bgColor: reparacionBgColor.RETIRADO, click: (reparacion: boleta) => { console.log("Retirado"); }
    },
  }

  constructor(private modalController: ModalController,
    private databaseService: DataBaseService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    console.log("-----------", this.reparacion)
    this.slidingConfig = {
      iconName: reparacionIconName[this.reparacion.estado],
      bgColor: reparacionBgColor[this.reparacion.estado],
      stateMessage: reparacionMessage[this.reparacion.estado]
    }
    console.log(this.reparacion.estado)
    this.reparacion.estado = this.reparacion.estado.toUpperCase() as boleta_estados;
    console.log(this.slidingOptionsByState[this.reparacion.estado])
    this.slidingOptions.push(this.slidingOptionsByState[this.reparacion.estado]);


  }

  mostrarDetalle() {
    this.mostrarDetalleEvent.emit(this.reparacion)

  }

  procesar(e: any) {
    e.stopPropagation();
    this.slidingOptions[0].click(this.reparacion);

  }


  async cambiarEstadoReparacion(reparacion: boleta, nuevoEstado: boleta_estados) {
    reparacion.estado = nuevoEstado;
    try {
      if (reparacion && reparacion.id) {
        await this.databaseService.actualizar('boletas', reparacion, reparacion.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
