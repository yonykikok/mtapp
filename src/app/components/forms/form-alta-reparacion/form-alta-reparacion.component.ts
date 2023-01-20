import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
import { DataBaseService } from 'src/app/services/database.service';
import { boleta_estados } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { ModalController } from '@ionic/angular';
firebase.initializeApp(environment.firebaseConfig);


@Component({
  selector: 'app-form-alta-reparacion',
  templateUrl: './form-alta-reparacion.component.html',
  styleUrls: ['./form-alta-reparacion.component.scss'],
})
export class FormAltaReparacionComponent implements OnInit {
  storageRef = firebase.app().storage().ref();
  imgVistaPrevia;
  photo;
  dni: number;
  nro_boleta: number;
  constructor(private alertService: AlertService,
    private database: DataBaseService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private modalController: ModalController) { }

  ngOnInit() { }


  async takePicture() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
      });

      this.imgVistaPrevia = 'data:image/jpeg;base64,' + capturedPhoto.base64String;
    } catch {
      console.log("error al capturar la imagen.")
    }
  };


  mostrarConfirmacion() {
    this.alertService.alertConfirmacion(
      'Confirma los datos',
      `
      Boleta:<b> ${this.nro_boleta}</b><br> 
      DNI: <b>${this.dni}</b> <br><br>
      ${this.imgVistaPrevia ? `<ion-img src=${this.imgVistaPrevia} alt="Boleta">` : ''}</ion-img>`,
      'Confirmar',
      () => {
        this.spinnerService.showLoading("Generando la boleta digital...")

        this.storageRef.child("boletas/" + 'FotoName').putString(this.imgVistaPrevia, 'data_url').then(async (respuesta) => {
          this.photo = await respuesta.ref.getDownloadURL();
          let boleta = {
            imgUrl: this.photo,
            dni: this.dni,
            nro_boleta: this.nro_boleta,
            fecha: new Date().getTime(),
            estado: boleta_estados.pendiente
          }


          this.database.crear('boletas', boleta).then(res => {
            this.toastService.simpleMessage("Exito!", "Se genero la boleta correctamente", ToastColor.success);
          this.spinnerService.stopLoading();
          this.modalController.dismiss();
          });

        }).catch(err => {
          this.spinnerService.stopLoading();
        })



      }
    )
  }


}
