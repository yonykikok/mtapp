import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { trabajoTercerizado } from 'src/app/pages/trabajos-tercerizados/trabajos-tercerizados.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

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
      this.alertService.mostrarAlertaConPrompt('¿Cuanto nos costo la reparación?', '2.000', 'Cancelar', 'Continuar', (respuesta: any) => {//ingreso el costo
        this.trabajo.costo = Number(respuesta.valor);

        this.alertService.mostrarAlertaConPrompt(`¿Cuanto se le cobrara al cliente?`,
          ` ${(this.trabajo.costo && this.trabajo.costo > 0) ? 'Precio recomendado ' + (this.trabajo.costo * 2) : '4.000'}`,
          'Cancelar', 'Continuar', (respuesta: any) => {//se ingreso el precio que sera del cliente
            this.trabajo.precio = Number(respuesta.valor);
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
          }, () => {
            this.trabajo.costo = -1;
            this.trabajo.fechaRetiro = -1;
          });

      }, () => {//cancelo cuando debia ingresar el valor
        this.trabajo.fechaRetiro = 0;
        this.trabajo.reparado = false;

      });
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
}
