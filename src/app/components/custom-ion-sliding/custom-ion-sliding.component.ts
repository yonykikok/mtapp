import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  @Input() reparacion;
  slidingConfig = {
    iconName: reparacionIconName.PENDIENTE,
    bgColor: reparacionBgColor.PENDIENTE,
    stateMessage: reparacionMessage.PENDIENTE
  }
  slidingOptions = [];
  slidingOptionsByState = {
    pendiente: {
      text: 'Cancelar', bgColor: reparacionBgColor.PENDIENTE, click: async (reparacion) => {
        this.alertService.alertConfirmacion('Cancelar Reparacion', 'Estas seguro de querer cancelarla?', "Si", this.cambiarEstadoReparacion.bind(this, reparacion, boleta_estados.CANCELADO_POR_EL_USUARIO));
      }
    },
    en_revision: {
      text: 'En revisión', bgColor: reparacionBgColor.EN_REVISION, click: (reparacion) => { console.log("En revisión"); }
    },
    cancelado_por_el_usuario: {
      text: 'Cancelado por el usuario', bgColor: reparacionBgColor.CANCELADO_POR_EL_USUARIO, click: (reparacion) => { console.log("Cancelado por el usuario"); }
    },
    en_proceso: {
      text: 'En proceso', bgColor: reparacionBgColor.EN_PROCESO, click: (reparacion) => { console.log("En proceso"); }
    },
    esperado_respuesta: {
      text: 'Esperando respuesta', bgColor: reparacionBgColor.ESPERADO_RESPUESTA, click: (reparacion) => { console.log("Esperando respuesta"); }
    },
    pausado: {
      text: 'Pausado', bgColor: reparacionBgColor.PAUSADO, click: (reparacion) => { console.log("Pausado"); }
    },
    no_reparado: {
      text: 'No reparado', bgColor: reparacionBgColor.NO_REPARADO, click: (reparacion) => { console.log("No reparado"); }
    },
    reparado: {
      text: 'Reparado', bgColor: reparacionBgColor.REPARADO, click: (reparacion) => { console.log("Reparado"); }
    },
    para_notificar: {
      text: 'Para notificar', bgColor: reparacionBgColor.PARA_NOTIFICAR, click: (reparacion) => { console.log("Para notificar"); }
    },
    para_entregar: {
      text: 'Para entregar', bgColor: reparacionBgColor.PARA_ENTREGAR, click: (reparacion) => { console.log("Para entregar"); }
    },
    retirado: {
      text: 'Retirado', bgColor: reparacionBgColor.RETIRADO, click: (reparacion) => { console.log("Retirado"); }
    },
  }

  constructor(private modalController: ModalController,
    private databaseService: DataBaseService,
    private alertService: AlertService) {
  }

  ngOnInit() {
console.log(this.reparacion)
    this.slidingConfig = {
      iconName: reparacionIconName[this.reparacion.estado.toUpperCase()],
      bgColor: reparacionBgColor[this.reparacion.estado.toUpperCase()],
      stateMessage: reparacionMessage[this.reparacion.estado.toUpperCase()]
    }

    this.slidingOptions.push(this.slidingOptionsByState[this.reparacion.estado.toLowerCase()]);


  }

  mostrarDetalle() {
    this.mostrarDetalleEvent.emit(this.reparacion)

  }

  procesar(e) {
    e.stopPropagation();
    this.slidingOptions[0].click(this.reparacion);

  }


  async cambiarEstadoReparacion(reparacion, nuevoEstado) {
    reparacion.estado = nuevoEstado;
    await this.databaseService.actualizar('boletas', reparacion, reparacion.id);
  }
}
