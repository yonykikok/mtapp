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
@Component({
  selector: 'app-cliente-acreedor',
  templateUrl: './cliente-acreedor.component.html',
  styleUrls: ['./cliente-acreedor.component.scss'],
})
export class ClienteAcreedorComponent implements OnInit {
  panelOpenState = false;
  @Input() acreedor: any;
  @Input() loggedUser!: User;



  constructor(
    private database: DataBaseService,
    private router: Router,
    private alertService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController,
    private alertController: AlertController,
    public funcionesUtiles: FuncionesUtilesService,
  ) { }

  ngOnInit(): void {

  }


  calcularPagos() {
    if (!this.acreedor.pagos) return;
    return Array.isArray(this.acreedor.items) ? this.acreedor.pagos.reduce((suma: number, pago: any) => suma + pago.monto, 0) : 0;

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
          pagos: this.acreedor.pagos,
          user: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardarCambios') {
          this.acreedor.pagos = result.data;
          this.database.actualizar(environment.TABLAS.acreedores, this.acreedor, this.acreedor.id)?.then(res => {
            this.toastService.simpleMessage('Exito', 'Cambios guardados', ToastColor.success);
          })
        }

      })
      return await modal.present();
    } catch (err) {
    }

  }

  solicitarConfirmacion() {
    this.alertService.alertConfirmacion('Confirmación', '¿Quiere confirmar que este cliente esta llevando el producto que quiere?', 'Si, confirmar', () => {
      this.acreedor['saldado'] = true;
      this.database.actualizar(environment.TABLAS.acreedores, this.acreedor, this.acreedor.id)?.then(res => { });
    });
  }

  async presentAlertPrompt(cliente:Deudor) {
    const alert = await this.alertController.create({
      header: 'Editar Datos',
      inputs: [
        {
          value:cliente.nombre,
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          value:cliente.apellido,
          name: 'apellido',
          type: 'text',
          placeholder: 'Apellido'
        },
        {
          value:cliente.dni,
          name: 'dni',
          type: 'number',
          placeholder: 'DNI'
        },
        {
           value:cliente.direccion,
          name: 'direccion',
          type: 'text',
          placeholder: 'Dirección'
        },
        {
           value:cliente.telefono,
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
            console.log('Datos guardados:', data);
            // Aquí puedes manejar los datos ingresados
          }
        }
      ]
    });
  
    await alert.present();
  }

  
  solicitarConfirmacionDeMensaje(event: any, deudor: Deudor) {
    event.stopPropagation();
    this.alertService.alertConfirmacion('Confirmación', '¿Quiere enviarle un mensaje al cliente en este momento?', 'Si', () => {
      this.abrirWhatsApp(deudor,'')
    });
  }

  abrirWhatsApp(deudor: Deudor, mensaje: string) {
    const url = `https://api.whatsapp.com/send?phone=+54${deudor.telefono}&text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_system');
  }
}
