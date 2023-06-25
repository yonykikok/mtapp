import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { FormAgregarItemDeudaComponent } from '../forms/form-agregar-item-deuda/form-agregar-item-deuda.component';
import { FormAgregarPagoDeudaComponent } from '../forms/form-agregar-pago-deuda/form-agregar-pago-deuda.component';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';

@Component({
  selector: 'app-deuda-cliente',
  templateUrl: './deuda-cliente.component.html',
  styleUrls: ['./deuda-cliente.component.scss'],
})
export class DeudaClienteComponent {
  panelOpenState = false;
  @Input() deudor;
  @Input() loggedUser;



  constructor(
    private database: DataBaseService,
    private router: Router,
    private alertService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController,
  ) { }


  calcularDeuda() {
    if (!this.deudor.items) return;
    return Array.isArray(this.deudor.items) ? this.deudor.items.reduce((suma, item) => suma + item.precio, 0) : 0;

  }

  calcularPagos() {
    if (!this.deudor.pagos) return;
    return Array.isArray(this.deudor.items) ? this.deudor.pagos.reduce((suma, pago) => suma + pago.monto, 0) : 0;

  }
  calcularRestante() {
    return this.calcularDeuda() - this.calcularPagos();
  }

  async openDialog() {
    if (!this.loggedUser.securityCode) {//si aun no tiene codigo lo mandamos a crear uno
      this.alertService.alertConfirmacion('Sin Codigo Creado', `Aun no has configurado tu codigo personal.
      ¿Quieres crearlo ahora?`, 'Si, crear ahora', () => {
        this.router.navigate(['/myProfile']);
      });
      return;
    }

    try {
      const modal = await this.modalController.create({
        component: VerificationCodeComponent,
        componentProps: {
          loggedUser: this.loggedUser,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'codigoCorrecto') {
          this.mostrarDialogAgregarPago();
        }
      })
      return await modal.present();
    } catch (err) {
    }

  }

  async mostrarDialogAgregarPago() {
    try {
      const modal = await this.modalController.create({
        component: FormAgregarPagoDeudaComponent,
        componentProps: {
          pagos: this.deudor.pagos,
          user: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardarCambios') {
          this.deudor.pagos = result.data;
          if (this.calcularRestante() === 0) {
            //TODO: agregar alert de confirmacion.
            if (!this.deudor.historial) {
              this.deudor['historial'] = [];
            }
            this.deudor.historial = [...this.deudor.historial,
            {
              items: [...this.deudor.items],
              pagos: [...this.deudor.pagos]
            }
            ];
            this.deudor.items = [];
            this.deudor.pagos = [];
          }
          this.database.actualizar(environment.TABLAS.deudores, this.deudor, this.deudor.id).then(res => {
            this.toastService.simpleMessage('Exito', 'Cambios guardados', ToastColor.success);
          })
        }

      })
      return await modal.present();
    } catch (err) {
    }

  }

  async openDialogAgregarCompra() {
    try {
      const modal = await this.modalController.create({
        component: FormAgregarItemDeudaComponent,
        componentProps: {
          items: this.deudor.items,
          user: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardarCambios') {
          this.deudor.items = result.data;
          this.database.actualizar(environment.TABLAS.deudores, this.deudor, this.deudor.id).then(res => {
            this.toastService.simpleMessage('Exito', 'Se guardaron los cambios', ToastColor.success);
          })
        }
      })
      return await modal.present();
    } catch (err) {
    }


  }

}
