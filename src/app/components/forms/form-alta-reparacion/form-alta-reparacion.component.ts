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
import { FormControl, FormGroup, Validators } from '@angular/forms';
firebase.initializeApp(environment.firebaseConfig);


@Component({
  selector: 'app-form-alta-reparacion',
  templateUrl: './form-alta-reparacion.component.html',
  styleUrls: ['./form-alta-reparacion.component.scss'],
})
export class FormAltaReparacionComponent implements OnInit {
  ruta;
  storageRef = firebase.app().storage().ref();
  imgVistaPrevia;


  formAltaReparacion = new FormGroup({
    dniCliente: new FormControl('', [Validators.required]),
    nroBoleta: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
  })

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
      console.error("error al capturar la imagen.")
    }
  };


  mostrarConfirmacion() {
    let { dniCliente, nroBoleta, telefono } = this.formAltaReparacion.value;
    let hoy = new Date(Date.now());

    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[hoy.getMonth()];
    let year = hoy.getFullYear();

    this.alertService.alertConfirmacion(
      'Confirma los datos',
      `Boleta:<b> ${nroBoleta}</b><br> 
      DNI: <b>${dniCliente}</b> <br>  
      Telefono: <b>${telefono}</b> <br><br>
      ${this.imgVistaPrevia ? `<ion-img src=${this.imgVistaPrevia} alt="Boleta">` : ''}</ion-img>`,
      'Confirmar',
      () => {
        this.spinnerService.showLoading("Generando la boleta digital...")

        this.storageRef.child("boletas/" + 'FotoName').putString(this.imgVistaPrevia, 'data_url').then(async (respuesta) => {
          let photo = await respuesta.ref.getDownloadURL();
          let boleta = {
            completa: false,
            images: [photo],
            dniCliente:dniCliente.toString(),
            nroBoleta:nroBoleta.toString(),
            fechaAlta: new Date().getTime(),
            estado: boleta_estados.PENDIENTE,
            telefono:telefono.toString(),
            fechaId: `${month}${year}`
          }
          this.database.crear(environment.TABLAS.boletasReparacion, boleta).then(res => {
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
