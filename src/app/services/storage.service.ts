import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { ToastColor, ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storageRef = firebase.app().storage().ref();
  constructor(
    private toastService: ToastService
  ) { }

  async subirImagen(name: string, imgBase64: any) {
    try {
      let respuesta = await this.storageRef.child('tienda/productos/' + name).putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      this.toastService.simpleMessage('Error', 'al subir la imagen a firebase  ocurrio un error', ToastColor.danger);
      return null;
    }
  }
  async subirImagenfullPath(fullPath: string, imgBase64: any) {
    try {
      let respuesta = await this.storageRef.child(fullPath).putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      this.toastService.simpleMessage('Error', 'al subir la imagen a firebase  ocurrio un error', ToastColor.danger);
      return null;
    }
  }

  async subirImagenEquiposVenta(ruta: string, imgBase64: any) {
    try {
      let respuesta = await this.storageRef.child(ruta).putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      console.log(err)
      this.toastService.simpleMessage('Error', 'al subir la imagen a firebase  ocurrio un error', ToastColor.danger);
      return null;
    }
  }
  async subirImagenEquiposTercerizados(ruta: string, imgBase64: any) {
    try {
      let respuesta = await this.storageRef.child(ruta).putString(imgBase64, 'data_url');
      return await respuesta.ref.getDownloadURL();
    } catch (err) {
      this.toastService.simpleMessage('Error', 'al subir la imagen a firebase  ocurrio un error', ToastColor.danger);
      return null;
    }
  }


}

