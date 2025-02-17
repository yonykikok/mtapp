import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { FormAgregarItemDeudaComponent } from '../forms/form-agregar-item-deuda/form-agregar-item-deuda.component';
import { FormAgregarPagoDeudaComponent } from '../forms/form-agregar-pago-deuda/form-agregar-pago-deuda.component';
import { VerificationCodeComponent } from '../verification-code/verification-code.component';
import { User } from 'src/app/clases/user';
import { Deudor } from 'src/app/pages/deudores/cuentas-clientes.page';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { HistorialCuentaClienteComponent } from '../historial-cuenta-cliente/historial-cuenta-cliente.component';

@Component({
  selector: 'app-deuda-cliente',
  templateUrl: './deuda-cliente.component.html',
  styleUrls: ['./deuda-cliente.component.scss'],
})
export class DeudaClienteComponent {
  panelOpenState = false;
  @Input() deudor: any;
  @Input() loggedUser!: User;



  constructor(
    private database: DataBaseService,
    private router: Router,
    private alertService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController,
    private alertController: AlertController,
    public funcionesUtiles: FuncionesUtilesService,
  ) {

  }


  calcularDeuda() {
    if (!this.deudor.items) return;
    return Array.isArray(this.deudor.items) ? this.deudor.items.reduce((suma: number, item: any) => suma + item.precio, 0) : 0;

  }

  calcularPagos() {
    if (!this.deudor.pagos) return;
    return Array.isArray(this.deudor.items) ? this.deudor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0) : 0;

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
          this.database.actualizar(environment.TABLAS.deudores, this.deudor, this.deudor.id)?.then(res => {
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
          this.database.actualizar(environment.TABLAS.deudores, this.deudor, this.deudor.id)?.then(res => {
            this.toastService.simpleMessage('Exito', 'Se guardaron los cambios', ToastColor.success);
          })
        }
      })
      return await modal.present();
    } catch (err) {
    }


  }

  async presentAlertPrompt(cliente: Deudor) {
    const alert = await this.alertController.create({
      header: 'Editar Datos',
      inputs: [
        {
          value: cliente.nombre,
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          value: cliente.apellido,
          name: 'apellido',
          type: 'text',
          placeholder: 'Apellido'
        },
        {
          value: cliente.dni,
          name: 'dni',
          type: 'number',
          placeholder: 'DNI'
        },
        {
          value: cliente.direccion,
          name: 'direccion',
          type: 'text',
          placeholder: 'Dirección'
        },
        {
          value: cliente.telefono,
          name: 'telefono',
          type: 'tel',
          placeholder: 'Teléfono'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Edición cancelada');
          }
        },
        {
          text: 'Guardar',
          handler: (data) => {
            cliente = { ...cliente, ...data };
            console.log('Datos guardados:', cliente);

            this.database.actualizar(environment.TABLAS.deudores, cliente, cliente.id);
            // Aquí puedes manejar los datos ingresados
          }
        }
      ]
    });

    await alert.present();
  }

  solicitarConfirmacion(event: any, deudor: Deudor) {
    event.stopPropagation();
    this.alertService.alertConfirmacion('Confirmación', '¿Quiere enviarle un mensaje al cliente en este momento?', 'Si', () => {
      this.abrirWhatsApp(deudor, '')
    });
  }

  abrirWhatsApp(deudor: Deudor, mensaje: string) {
    const url = `https://api.whatsapp.com/send?phone=+54${deudor.telefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_system');
  }

  async mostrarHistorialCliente(deudor: Deudor) {
    let modal = await this.modalController.create({
      component: HistorialCuentaClienteComponent,
      componentProps: {
        cliente: deudor
      }
    })
    modal.present();
  }
}
