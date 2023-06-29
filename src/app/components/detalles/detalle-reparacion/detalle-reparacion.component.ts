
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { reparacionShortMessage } from 'src/app/services/info-compartida.service';
import { boleta_estados, listaDeEstadosBoletas, reparacionIconName } from 'src/app/services/info-compartida.service';

@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss'],
})
export class DetalleReparacionComponent implements OnInit {
  ruta;
  mostrarHistorial = false;
  modoEditar = false;
  reparacion;
  mostrarImgBoleta = false;
  estadosPosibles;
  estadoSeleccionado;
  loggedUser;
  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.getOpcionesEstadoDisponibles();
    this.reparacion.historial = [
      {
        "estadoAnterior": "PENDIENTE",
        "estadoActual": "EN_REVISION",
        "fecha": "2023-06-28T02:10:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Empezamos a revisar el equipo."
      },
      {
        "estadoAnterior": "EN_REVISION",
        "estadoActual": "PARA_NOTIFICAR",
        "fecha": "2023-06-28T02:11:40.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Se encontro el equipo mojado en el sector del flex de carga, se tiene que hacer una limpieza y posiblemente haya que cambiar el flex, precio de la limpieza $2500, precio del flex $7500."
      },
      {
        "estadoAnterior": "PARA_NOTIFICAR",
        "estadoActual": "ESPERADO_RESPUESTA",
        "fecha": "2023-06-28T03:12:01.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Se notifico y se espera respuesta para continuar."
      },
      {
        "estadoAnterior": "ESPERADO_RESPUESTA",
        "estadoActual": "EN_PROCESO",
        "fecha": "2023-06-28T04:20:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "El cliente confirmo el presupuesto."
      },
      {
        "estadoAnterior": "EN_PROCESO",
        "estadoActual": "PAUSADO",
        "fecha": "2023-06-28T05:20:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Se hizo la limpieza pero hace falta cambiar el flex, no lo tenemos en stock. Se pausa hasta el sabado."
      },
      {
        "estadoAnterior": "PAUSADO",
        "estadoActual": "EN_PROCESO",
        "fecha": "2023-06-28T06:20:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Ya tenemos el repuesto, retomamos la reparacion."
      },
      {
        "estadoAnterior": "EN_PROCESO",
        "estadoActual": "REPARADO",
        "fecha": "2023-06-28T07:20:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "El equipo quedo funcional con el cambio del flex de carga y la limpieza.."
      },
      {
        "estadoAnterior": "REPARADO",
        "estadoActual": "PARA_NOTIFICAR",
        "fecha": "2023-06-28T07:40:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Se tiene que notificar la reparacion y darle el monto total de $10.000 ."
      },
      {
        "estadoAnterior": "PARA_NOTIFICAR",
        "estadoActual": "PARA_ENTREGAR",
        "fecha": "2023-06-28T28:50:10.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "Se notifico al cliente con el importe total y se pone para ser retirado."
      },
      {
        "estadoAnterior": "PARA_ENTREGAR",
        "estadoActual": "RETIRADO",
        "fecha": "2023-06-28T09:20:16.228Z",
        "modificadoPor": {
          "displayName": "Jonathan Haedo"
        },
        "detalle": "El cliente paso a retirar el equipo sin boleta, dejando la firma en la original."
      },
    ]

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

    const estadosCoincidentes = listaDeEstadosBoletas.filter((estado) =>
      opcionesPorEstado[this.reparacion.estado.toUpperCase()].includes(estado.variable.toUpperCase())
    );


    this.estadosPosibles = estadosCoincidentes || [];
  }
  getIconName() {
    return reparacionIconName[this.reparacion.estado.toUpperCase()];
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
            let cambioDeEstado = {
              estadoAnterior: this.reparacion.estado,
              estadoActual: this.estadoSeleccionado,
              fecha: new Date(),
              modificadoPor: {
                id: this.loggedUser.id,
                displayName: this.loggedUser.displayName,
              },
              detalle: data.descripcion
            }
        
            this.modoEditar = false;
            this.reparacion.estado = this.estadoSeleccionado;
            if (!this.reparacion.historial) { this.reparacion.historial = [] };
            this.reparacion.historial = [...this.reparacion.historial, cambioDeEstado];
            this.getOpcionesEstadoDisponibles();
          }
        }
      ]
    });

    await alert.present();
  }
  obtenerMensajeDelEstado(estado) {
    return reparacionShortMessage[estado.toUpperCase()];
  }


}
