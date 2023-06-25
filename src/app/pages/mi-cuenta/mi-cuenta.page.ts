import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ViewDidEnter } from '@ionic/angular';
import { BarcodeScannerComponent } from 'src/app/components/barcode-scanner/barcode-scanner.component';
import { CargarCorreoComponent } from 'src/app/components/cargar-correo/cargar-correo.component';
import { CargarTelefonoComponent } from 'src/app/components/cargar-telefono/cargar-telefono.component';
import { GenerarClaveComponent } from 'src/app/components/generar-clave/generar-clave.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit, ViewDidEnter {
  user: any = this.authService.currentUser;
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    private authService: AuthService,
    private alertController: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.verSiTieneLaInfoCompleta()
  }

  verSiTieneLaInfoCompleta() {
    if(!this.user) return;
    if (!this.user.correo) {
      this.mostrarPopupCorreo();
    }
    if (!this.user.telefono) {
      this.mostrarPopupNumeroTelefonico();
    }
  }
  ionViewDidEnter(): void {
  }

  async mostrarScannerComponent() {
    try {

      const modal = await this.modalController.create({
        component: BarcodeScannerComponent,
        componentProps: {},
      })


      modal.onDidDismiss().then((result: any) => {
        if (!result.data) return;
        let barcodeData = result.data;

        if (barcodeData.text.includes('@')) {
          let info = this.obtenerInfoDni(barcodeData.text);

          if (info) {
            if (String(info.dni) == String(this.authService.currentUser.dni)) {
              this.user['nombre'] = info.nombre;
              this.user['apellido'] = info.apellido;
              this.user['dni'] = info.dni;
              this.user['fecha'] = info.fNacimiento;
              this.user['sexo'] = info.sexo;
              this.toastService.simpleMessage("Escaneo exitoso", "Se cargó la información del documento a su cuenta.", ToastColor.success);
              this.actualizarUsuario();

              if (!this.user.correo) {
                this.mostrarPopupCorreo();
              }
            } else {
              this.toastService.simpleMessage("No Coincide", "El documento escaneado no coincide con el de ingreso.", ToastColor.danger);
            }
          } else {
            this.toastService.simpleMessage("QR Ilegible", "No se pudo encontrar la información del código.", ToastColor.danger);
          }

        } else {
          if (!barcodeData.cancelled) {
            this.toastService.simpleMessage("QR Equivocado", "El código escaneado no tiene las características de un DNI", ToastColor.warning);
          }
        }
      })
      return await modal.present();
    } catch (err) {
    }

  }

  async mostrarPopupCorreo() {
    try {
      const modal = await this.modalController.create({
        component: CargarCorreoComponent,
        componentProps: {
          correo: this.user?.email
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.user['correo'] = result.data;
            this.actualizarUsuario();
            this.toastService.simpleMessage("Correo guardado", "Se cargó el correo a su cuenta.", ToastColor.success);

            if (!this.user.telefono) {
              this.mostrarPopupNumeroTelefonico();
            }
            break;
          case 'update':

            break;
        }

      })
      return await modal.present();
    } catch (err) {
    }

  }
  actualizarUsuario() {
    if (
      this.user.correo &&
      this.user.telefono &&
      this.user.nombre &&
      this.user.password
    ) {
      this.user.activo = true;
      this.toastService.simpleMessage("Cuenta activada", "Se activó con éxito su cuenta, ya puede comenzar a utilizar la App", ToastColor.success);
    }
    this.database.actualizar('users', this.user, this.user.dni.toString());
  }

  async mostrarPopupNumeroTelefonico() {
    try {
      const modal = await this.modalController.create({
        component: CargarTelefonoComponent,
        componentProps: {
          telefono: this.user?.telefono
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.user['telefono'] = result.data;
            this.actualizarUsuario();
            this.toastService.simpleMessage("Teléfono guardado", "Se cargó el número de teléfono a su cuenta.", ToastColor.success);


            break;
          case 'update':

            break;
        }

      })
      return await modal.present();
    } catch (err) {
    }
  }


  async mostrarPopupGenerarClave() {
    try {
      const modal = await this.modalController.create({
        component: GenerarClaveComponent,
        componentProps: {
          password: ""
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.user['password'] = this.authService.generarHashPassword(result.data.toString());
            this.actualizarUsuario();

            break;
          case 'update':

            break;
        }

      })
      return await modal.present();
    } catch (err) {
    }
  }
  obtenerInfoDni(texto: string) {

    let campos = texto.split('@');

    if (campos.length < 5) return;

    let camposFecha = campos[6].split("/");
    let fecha = `${camposFecha[0]}-${camposFecha[1]}-${camposFecha[2]}`

    let info = {
      // nTramite: campos[0],
      sexo: campos[3].toLocaleLowerCase() == 'f' ? 'femenino' : 'masculino',
      apellido: campos[1],
      nombre: campos[2],
      dni: campos[4],
      fNacimiento: fecha
    }

    return info;
  }
  async generarClave() {
    if (!this.user.activo) {
      const alert = await this.alertController.create({
        mode: 'ios',
        header: "Completar informacion",
        message: "Antes de generar tu contraseña debes completar la información básica.",
        buttons: [
          {
            text: "Cancelar",
            cssClass: 'secondary',
            role: "cancel",
          },
          {
            text: "Completar",
            handler: () => {
              this.mostrarScannerComponent();
            }
          }
        ]
      })
      alert.present();
    } else {
      this.mostrarPopupGenerarClave();
    }
  }
}
