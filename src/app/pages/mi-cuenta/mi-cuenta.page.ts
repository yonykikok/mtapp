import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ViewDidEnter } from '@ionic/angular';
import { BarcodeScannerComponent } from 'src/app/components/barcode-scanner/barcode-scanner.component';
import { CargarCorreoComponent } from 'src/app/components/cargar-correo/cargar-correo.component';
import { CargarTelefonoComponent } from 'src/app/components/cargar-telefono/cargar-telefono.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
})
export class MiCuentaPage implements OnInit, ViewDidEnter {
  user:any={};
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // console.log(typeof this.authService.currentUser.dni, this.authService.currentUser.dni)
    this.mostrarPopupCorreo();

  }
  ionViewDidEnter(): void {
    // this.database.obtenerPorId('users', String(this.authService.currentUser.dni)).subscribe(res => {
    //   // this.user = res.payload.data()
    //   this.user = {
    //     dni: 37755134,
    //     activo: false
    //   }
    //   console.log(this.user)
    // })
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
        // this.customAlert("Test QR Scanner", JSON.stringify(barcodeData));
        console.log("--------", barcodeData)
        if (barcodeData.text.includes('@')) {
          let info = this.obtenerInfoDni(barcodeData.text);
          console.log("--------", JSON.stringify(info));
          if (info) {
            if (String(info.dni) == String(this.authService.currentUser.dni)) {
              // this.eventsService.toastPublish("Se cargo la informacion del documento.", { duration: 4000, color: 'success', position: 'bottom' })
              // this.customAlert("Test QR Scanner", JSON.stringify(info));
              this.user['nombre'] = info.nombre;
              this.user['apellido'] = info.apellido;
              this.user['dni'] = info.dni;
              this.user['fecha'] = info.fNacimiento;
              this.user['sexo'] = info.sexo;
              this.mostrarPopupCorreo();
            } else {
              //notificar que el dni de ingreso no coincide con el escaneado.
            }


          } else {
            // this.customAlert("QR Ilegible", "No se pudo encontrar la informacion del codigo.")
            // this.eventsService.toastPublish("QR Ilegible, No se encontro la informacion del codigo.", { duration: 4000, color: 'danger', position: 'bottom' })
          }

        } else {
          if (!barcodeData.cancelled) {
            // this.eventsService.toastPublish("QR Equivocado. El codigo escaneado no tiene las caracteristicas de un DNI", { duration: 4000, color: 'danger', position: 'bottom' })
            // this.customAlert("QR Equivocado", "El codigo escaneado no tiene las caracteristicas de un DNI" + JSON.stringify(barcodeData))
          }
        }
      })
      return await modal.present();
    } catch (err) {
      alert(JSON.stringify(err));
    }

  }

  async mostrarPopupCorreo() {
    try {
      const modal = await this.modalController.create({
        component: CargarCorreoComponent,
        componentProps: {
          correo: "Jonathan@gmail.com"
          // correo: this.user?.email
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.user['correo'] = result.data;
            // this.mostrarPopupNumeroTelefonico();
            break;
          case 'update':

            break;
        }

      })
      return await modal.present();
    } catch (err) {
      alert(JSON.stringify(err));
    }

  }

  async mostrarPopupNumeroTelefonico() {
    try {
      const modal = await this.modalController.create({
        component: CargarTelefonoComponent,
        componentProps: {
          telefono: "1140401210"
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;
        switch (result.role) {
          case 'create':
            this.user['telefono'] = result.data;
            this.mostrarPopupNumeroTelefonico();
            break;
          case 'update':

            break;
        }

      })
      return await modal.present();
    } catch (err) {
      alert(JSON.stringify(err));
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
      console.log(this.user.nombre)
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
              console.log("Completando.");
              this.mostrarScannerComponent();
            }
          }
        ]
      })
      alert.present();
    }
  }
}
