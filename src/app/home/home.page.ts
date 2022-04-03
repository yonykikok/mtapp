import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BarcodeScannerComponent } from '../components/barcode-scanner/barcode-scanner.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  datos;
  constructor(private modalController: ModalController) { }

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
        console.log("--------",barcodeData)
        if (barcodeData.text.includes('@')) {
          let info = this.obtenerInfoDni(barcodeData.text);
          console.log("--------",JSON.stringify(info));
          if (info) {
            // this.eventsService.toastPublish("Se cargo la informacion del documento.", { duration: 4000, color: 'success', position: 'bottom' })
            // this.customAlert("Test QR Scanner", JSON.stringify(info));
            this.datos['nombre'] = info.nombre;
            this.datos['apellido'] = info.apellido;
            this.datos['dni'] = info.dni;
            this.datos['fnacimiento_con_formato'] = info.fNacimiento;
            this.datos['sexo'] = info.sexo;

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
}

