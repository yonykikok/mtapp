import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ViewDidEnter } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { BarcodeScannerComponent } from 'src/app/components/barcode-scanner/barcode-scanner.component';
import { CargarCorreoComponent } from 'src/app/components/cargar-correo/cargar-correo.component';
import { CargarTelefonoComponent } from 'src/app/components/cargar-telefono/cargar-telefono.component';
import { GenerarClaveComponent } from 'src/app/components/generar-clave/generar-clave.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit, ViewDidEnter {
  loggedUser!: User;
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    private authService: AuthService,
    private alertController: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  verSiTieneLaInfoCompleta() {
    if (!this.loggedUser) return;
    if (!this.loggedUser.email) {
      this.mostrarPopupCorreo();
    }
    if (!this.loggedUser.phoneNumber) {
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

              this.loggedUser.displayName = `${info.apellido} ${info.nombre}`;
              this.loggedUser.dni = info.dni;
              this.loggedUser.fNacimiento = info.fNacimiento;
              this.loggedUser.sexo = info.sexo;
              this.toastService.simpleMessage("Escaneo exitoso", "Se cargó la información del documento a su cuenta.", ToastColor.success);
              this.actualizarUsuario();

              if (!this.loggedUser.email) {
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
          correo: this.loggedUser?.email
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.loggedUser.email = result.data;
            this.actualizarUsuario();
            this.toastService.simpleMessage("Correo guardado", "Se cargó el correo a su cuenta.", ToastColor.success);

            if (!this.loggedUser.phoneNumber) {
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
      this.loggedUser.email &&
      this.loggedUser.phoneNumber &&
      this.loggedUser.displayName &&
      this.loggedUser.password
    ) {
      this.loggedUser.activo = true;//TODO:ver porque este codigo no es valido en esta app, not enemos el campo activo.
      this.toastService.simpleMessage("Cuenta activada", "Se activó con éxito su cuenta, ya puede comenzar a utilizar la App", ToastColor.success);
    }
    if (this.loggedUser.dni)
      this.database.actualizar('users', this.loggedUser, this.loggedUser.dni.toString());
  }

  async mostrarPopupNumeroTelefonico() {
    try {
      const modal = await this.modalController.create({
        component: CargarTelefonoComponent,
        componentProps: {
          telefono: this.loggedUser.phoneNumber
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.loggedUser.phoneNumber = result.data;
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
            this.loggedUser['password'] = this.authService.generarHashPassword(result.data.toString());
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
    if (!this.loggedUser.activo) {
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
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      if(!userRef) return; //TODO:notificar
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode'],
          dni: usuario['dni']
        } as User;
        // this.verSiTieneLaInfoCompleta();

      })
    })
  }
}
