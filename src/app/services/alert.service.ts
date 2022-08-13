import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }


  async alertSinAccion(header, message, textButton) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header,
      message,
      buttons: [
        {
          text: textButton,
          cssClass: 'secondary',
          role: "cancel",
        }
      ]
    })
    alert.present();
  }

  async alertConfirmacion(header, message, acceptText,handlerAcceptButton) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header,
      message,
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          role: "cancel",
        },
        {
          text: acceptText,
          cssClass: 'primary',
          handler:handlerAcceptButton
        }
      ]
    })
    alert.present();
  }
}
