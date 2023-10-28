import { Injectable } from '@angular/core';
import { AnimationBuilder, ToastController, ToastButton, IonicSafeString } from '@ionic/angular';
import { Color, Mode } from '@ionic/core';
export enum ToastPosition {
  'top' = 'top',
  'bottom' = 'bottom',
  'middle' = 'middle'
}
export enum ToastColor {
  'primary' = 'primary',
  'secondary' = 'secondary',
  'warning' = 'warning',
  'success' = 'success',
  'tertiary' = 'tertiary',
  'light' = 'light',
  'medium' = 'medium',
  'dark' = 'dark',
  'danger' = 'danger',
}
export enum ToastIcon {
  'alert-circle-outline' = 'alert-circle-outline',
  'warning-outline' = 'warning-outline',
  'checkmark-done-outline' = 'checkmark-done-outline',
  'thumbs-up-outline' = 'thumbs-up-outline'
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {
  }
  //ejemplo 
  // this.toastService.customAlert('Titulo', 'algun mensaje',3000, ToastColor.success, ToastPosition.top,ToastIcon['warning-outline']);



  async simpleMessage(header:string, message:string, color: ToastColor) {
    const toast = await this.toastController.create({
      header,
      message,
      mode: 'ios',
      duration: 5000,
      color
    });
    await toast.present();
  }

  async customAlert(header:string, message:string, duration:number, color: ToastColor, position: ToastPosition, icon?: ToastIcon) {
    const toast = await this.toastController.create({
      header,
      message,
      mode: 'ios',
      icon,
      position,
      duration,
      color
    });
    await toast.present();
  }

}
