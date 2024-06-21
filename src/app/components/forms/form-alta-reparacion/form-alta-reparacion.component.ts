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
import { DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { boleta } from 'src/app/pages/mis-reparaciones/mis-reparaciones.page';
firebase.initializeApp(environment.firebaseConfig);


@Component({
  selector: 'app-form-alta-reparacion',
  templateUrl: './form-alta-reparacion.component.html',
  styleUrls: ['./form-alta-reparacion.component.scss'],
})
export class FormAltaReparacionComponent implements OnInit {
  ruta: string = '';
  storageRef = firebase.app().storage().ref();
  imgVistaPrevia!: string;


  formAltaReparacion = new FormGroup({
    dniCliente: new FormControl('', [Validators.required]),
    nroBoleta: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
  })

  constructor(private alertService: AlertService,
    private database: DataBaseService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private modalController: ModalController,
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit() { }


  async takePicture() { //TODO: COMPRIMIR IMAGENES 
    this.spinnerService.showLoading('Comprimiendo imagen...');
    setTimeout(() => { this.spinnerService.stopLoading(); }, 3000);
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        promptLabelHeader: 'Seleccione una opción',
        promptLabelCancel: 'Cancelar',
        promptLabelPicture: 'Sacar una Foto con la Cámara',
        promptLabelPhoto: 'Seleccionar desde Galería',
        resultType: CameraResultType.DataUrl
      });
      //console.log(image)
      if (!image || !image.dataUrl) return;

      let base64Image;

      if (image.dataUrl.startsWith('data:image/jpeg')) {
        //console.log('se')
        base64Image = image.dataUrl;
      } else if (image.dataUrl.startsWith('data:image/png')) {
        //console.log('se2')
        base64Image = image.dataUrl.replace('data:image/png', 'data:image/jpeg');
      } else {
        this.toastService.simpleMessage('No compatible', 'Tipo de imagen no compatible', ToastColor.danger);
      }

      //codigo para comprimir la imagen.
      if (this.imageCompress.byteCount(image.dataUrl) >= 2_000_000) {
        let compressedImage = await this.imageCompress
          .compressFile(image.dataUrl, DOC_ORIENTATION.Default, 50, 50); // 50% ratio, 50% quality
        base64Image = compressedImage;
      }
      this.imgVistaPrevia = base64Image as string;

    } catch (error) {
      //console.log(error)
      return;
    }
  };


  mostrarConfirmacion() {
    let { dniCliente, nroBoleta, telefono, modelo } = this.formAltaReparacion.value;
    let hoy = new Date(Date.now());

    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[hoy.getMonth()];
    let year = hoy.getFullYear();



    this.alertService.alertConfirmacion(
      'Confirma los datos',
      `Boleta:<b> ${nroBoleta}</b><br> 
      Modelo: <b>${modelo}</b> <br>  
      DNI: <b>${dniCliente}</b> <br>  
      Telefono: <b>${telefono}</b> <br><br>
      ${this.imgVistaPrevia ? `<ion-img src=${this.imgVistaPrevia} alt="Boleta">` : ''}</ion-img>`,
      'Confirmar',
      () => {

        this.spinnerService.showLoading("Generando la boleta digital...")


        this.storageRef.child(`boletas/${month}${year}-${nroBoleta}-${dniCliente}`).putString(this.imgVistaPrevia, 'data_url').then(async (respuesta) => {
          let imgRef = respuesta.ref.fullPath; // Obtenemos la referencia completa del archivo
          let photo = await respuesta.ref.getDownloadURL();
          if (!dniCliente || !nroBoleta || !telefono || !modelo) return; //TODO: notificar
          let boleta: boleta = {
            completa: false,
            images: [photo],
            imgUrlsRef: [imgRef],//falta cargar la ref para poder eliminarlo 
            dniCliente: dniCliente.toString(),
            modelo: modelo.toString().toLowerCase(),
            nroBoleta: nroBoleta.toString(),
            fechaAlta: new Date().getTime(),
            estado: boleta_estados.PENDIENTE,
            telefono: telefono.toString(),
            fechaId: `${month}${year}`
          }
          //console.log(boleta)
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
