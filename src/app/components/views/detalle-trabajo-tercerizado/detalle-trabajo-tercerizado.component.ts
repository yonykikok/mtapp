import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { trabajoTercerizado } from 'src/app/pages/trabajos-tercerizados/trabajos-tercerizados.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { TiposDeTrabajosTercerizadosEnum } from '../../forms/form-alta-trabajo-tercerizado/form-alta-trabajo-tercerizado.component';

@Component({
  selector: 'app-detalle-trabajo-tercerizado',
  templateUrl: './detalle-trabajo-tercerizado.component.html',
  styleUrls: ['./detalle-trabajo-tercerizado.component.scss'],
})
export class DetalleTrabajoTercerizadoComponent implements OnInit {
  trabajo!: trabajoTercerizado;
  loggedUser!: User;
  constructor(private alertService: AlertService,
    private database: DataBaseService,
    private toastService: ToastService,
    private spinnerService: SpinnerService) { }

  ngOnInit() { }
  marcarComoRetirado() {
    this.trabajo.fechaRetiro = new Date().getTime();

    this.alertService.alertConfirmacionTripleAccion('Confirmación', '¿Se reparo el equipo?', 'Si, ya esta listo', () => {//si se reparo
      this.trabajo.reparado = true;
      this.consultarCostoDeReparacion();
    },
      'No se pudo reparar', () => {//si no se repara
        this.trabajo.reparado = false;
        this.spinnerService.showLoading('Guardando cambios...');
        if (this.trabajo.id) {
          this.database.actualizar(environment.TABLAS.trabajos_tercerizados, this.trabajo, this.trabajo.id)?.then(res => {
            this.toastService.simpleMessage('Exito', 'Se guardaron los cambios correctamente', ToastColor.success);
          }).catch(err => {
            this.toastService.simpleMessage('ERROR', 'no se pudieron guardar los cambios', ToastColor.success);

          }).finally(() => {
            this.spinnerService.stopLoading();
          })
        }

      }, () => {//si cancelo
        this.trabajo.fechaRetiro = 0;
      });
  }


  consultarCostoDeReparacion() {
    this.alertService.mostrarAlertaConPrompt('¿Cuanto nos costo la reparación?', '2.000', 'Cancelar', 'Continuar', (respuesta: any) => {//ingreso el costo
      this.trabajo.costo = Number(respuesta.valor);
      this.consultarValorACobrarAlCliente();
    }, () => {//cancelo cuando debia ingresar el valor
      this.trabajo.fechaRetiro = 0;
      this.trabajo.reparado = false;

    });
  }



  consultarValorACobrarAlCliente() {
    this.alertService.mostrarAlertaConPrompt(`¿Cuanto se le cobrara al cliente?`,
      ` ${(this.trabajo.costo && this.trabajo.costo > 0) ? 'Precio recomendado ' + (this.trabajo.costo * 2) : '4.000'}`,
      'Cancelar', 'Continuar', (respuesta: any) => {
        this.trabajo.precio = Number(respuesta.valor);

        // this.guardarInformacionEnFirebase();
        if (this.trabajo.trabajo == TiposDeTrabajosTercerizadosEnum.Liberacion) {
          this.consultarNuevoImei();
        }

      }, () => {
        delete this.trabajo.costo;
        delete this.trabajo.fechaRetiro;
      });
  }

  consultarNuevoImei() {
    this.alertService.mostrarAlertaConPrompt('Nuevo IMEI', 'Indique el nuevo IMEI del equipo', 'Cancelar', 'Continuar', (respuesta: any) => {//ingreso el costo
      this.trabajo.imeiNuevo = respuesta.valor;
      this.consultarNuevoAndroid();

    }, () => {//cancelo cuando debia ingresar el valor
      delete this.trabajo.costo;
      delete this.trabajo.precio;
      delete this.trabajo.fechaRetiro;

    });
  }
  consultarNuevoAndroid() {
    this.alertService.mostrarAlertaConPrompt('Nueva version', 'Indique la nueva version de Android', 'Cancelar', 'Continuar', (respuesta: any) => {//ingreso el costo
      this.trabajo.versionAndroidNuevo = respuesta.valor;
      this.guardarInformacionEnFirebase();

    }, () => {//cancelo cuando debia ingresar el valor
      delete this.trabajo.costo;
      delete this.trabajo.precio;
      delete this.trabajo.fechaRetiro;
      delete this.trabajo.imeiNuevo;
    });
  }



  guardarInformacionEnFirebase() {
    this.spinnerService.showLoading('Guardando cambios...');
    if (this.trabajo.id) {
      this.database.actualizar(environment.TABLAS.trabajos_tercerizados, this.trabajo, this.trabajo.id)?.then(res => {
        this.toastService.simpleMessage('Exito', 'Se guardaron los cambios correctamente', ToastColor.success);
      }).catch(err => {
        this.toastService.simpleMessage('ERROR', 'no se pudieron guardar los cambios', ToastColor.success);

      }).finally(() => {
        this.spinnerService.stopLoading();
      })
    }
  }
}
