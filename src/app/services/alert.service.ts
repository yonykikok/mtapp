import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }


  async alertSinAccion(header: string, message: string, textButton: string) {
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

  async alertConfirmacion(header: string, message: string, acceptText: string, handlerAcceptButton: any) {
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
          handler: handlerAcceptButton
        }
      ]
    })
    alert.present();
  }

  async alertConfirmacionTripleAccion(header: string, message: string, acceptText: string, handlerAcceptButton: any, refuseText: string, handlerRefuseButton: any, handlerCancelButton: any) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header,
      message,
      buttons: [{
        text: acceptText,
        cssClass: 'primary',
        handler: handlerAcceptButton
      },
      {
        text: refuseText,
        cssClass: 'secondary',
        handler: handlerRefuseButton
      },
      {
        text: 'Cancelar',
        cssClass: 'secondary',
        role: "cancel",
        handler: handlerCancelButton
      }

      ]
    })
    alert.present();
  }


  async mostrarAlertaConPrompt(header: string, placeholder: string, cancelText: string, confirmText: string, handlerAcceptButton: any, handlerCancelButton: any) {
    const alert = await this.alertController.create({
      header,
      inputs: [
        {
          name: 'valor',
          type: 'number',
          placeholder,
        },
      ],
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: handlerCancelButton
        },
        {
          text: confirmText,
          handler: handlerAcceptButton,
        },
      ],
    });

    await alert.present();

    return new Promise<string | null>((resolve) => { });
  }
  async mostrarAlertaConTextPrompt(header: string, placeholder: string, cancelText: string, confirmText: string, handlerAcceptButton:any, handlerCancelButton:any) {
    const alert = await this.alertController.create({
      header,
      inputs: [
        {
          name: 'valor',
          placeholder,
        },
      ],
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: handlerCancelButton
        },
        {
          text: confirmText,
          handler: handlerAcceptButton,
        },
      ],
    });

    await alert.present();

    return new Promise<string | null>((resolve) => { });
  }
}
