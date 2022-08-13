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
    iconName: reparacionIconName.pendiente,
    bgColor: reparacionBgColor.pendiente,
    stateMessage: reparacionMessage.pendiente
  }
  slidingOptions = [];
  slidingOptionsByState = {
    pendiente: {
      text: 'Cancelar', bgColor: 'red', click: async (reparacion) => {
        this.alertService.alertConfirmacion('Cancelar Reparacion', 'Estas seguro de querer cancelarla?', "Si", this.cambiarEstadoReparacion.bind(this, reparacion, boleta_estados.cancelado_por_el_usuario));
        console.log(`actualizado`)
      }
    },
    en_proceso: {
      text: 'Consultar', bgColor: 'rgb(14, 122, 189)', click: (reparacion) => { console.log("Consultar ", reparacion); }
    },
    reparado: {
      text: 'Sin acciones', bgColor: 'gray', click: () => { return }
    },
    cancelado_por_el_usuario: {
      text: 'Reactivar', bgColor: 'green', click: (reparacion) => {
        this.alertService.alertConfirmacion('Reactivar Reparacion', `Estas seguro de querer reactivarla? <br><br> Luego, los tecnicos tendran que aceptar la reparacion.`, "Si", this.cambiarEstadoReparacion.bind(this, reparacion, boleta_estados.pendiente));
      }
    },
    sin_reparar: {
      text: 'Archivar', bgColor: 'rgb(14, 122, 189)', click: (reparacion) => { console.log("Archivar ", reparacion); }
    },
    diagnosticado: {
      text: 'Confirmar', bgColor: 'green', click: (reparacion) => { console.log("Confirmar ", reparacion); }
    },
  }
  constructor(private modalController: ModalController,
    private databaseService: DataBaseService,
    private alertService: AlertService) {
  }

  ngOnInit() {

    this.slidingConfig = {
      iconName: reparacionIconName[this.reparacion.estado],
      bgColor: reparacionBgColor[this.reparacion.estado],
      stateMessage: reparacionMessage[this.reparacion.estado]
    }

    this.slidingOptions.push(this.slidingOptionsByState[this.reparacion.estado]);

    console.log({ ...this.reparacion });

  }

  mostrarDetalle() {
    this.mostrarDetalleEvent.emit(this.reparacion)
    console.log(this.reparacion)

  }

  procesar(e) {
    e.stopPropagation();
    this.slidingOptions[0].click(this.reparacion);

  }


  async cambiarEstadoReparacion(reparacion, nuevoEstado) {
    reparacion.estado = nuevoEstado;
    await this.databaseService.actualizar('boletas', reparacion, reparacion.id);
    console.log("se actualizo la boleta")
  }
}
