import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/database.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-equipo-disponible',
  templateUrl: './form-equipo-disponible.component.html',
  styleUrls: ['./form-equipo-disponible.component.scss'],
})
export class FormEquipoDisponibleComponent implements OnInit {

  step = 2;
  imagenes = [];
  equipoVendido;
  mostrarSpinner = false;

  step1FormGroup: FormGroup;
  step2FormGroup: FormGroup;
  step3FormGroup: FormGroup;
  step4FormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private dataBase: DataBaseService,
    // private snackBar: MatSnackBar,
    private storageService: StorageService,
    // private dialogRef: MatDialogRef<FormAltaEquipoVendidoComponent>
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.step2FormGroup = this._formBuilder.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      imei: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(17)]],
      precio: ['', Validators.required],
    });
    this.step3FormGroup = this._formBuilder.group({
      accesorios: [''],
    });
    this.step4FormGroup = this._formBuilder.group({
      images: [''],
    });
  }




  actualizarImagenes(images) {
    this.step4FormGroup.controls.images.setValue(images);
  }

  agregarImagen(e) {
    if (this.imagenes.length >= 2) {
      this.imagenes = [];
    }
    let files = e.target.files;
    let maxIteration = files.length < 2 ? files.length : 2;

    for (let i = 0; i < maxIteration; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        if (this.imagenes.length < 2) {
          this.imagenes.push(reader.result);
          // this.selectedImg = this.imagenes[0];
        }
      }
    }
  }

  procesarVenta() {
    this.equipoVendido = {
      ...this.step1FormGroup.value,
      ...this.step2FormGroup.value,
      ...this.step3FormGroup.value,
      ...this.step4FormGroup.value,
      fecha: Date.now()
    }
    this.uploadImages(this.equipoVendido.images, `equipos_vendidos/`);


  }
  cerrarFormulario() {
    this.modalController.dismiss();
  }
  uploadImages(images, imgPath) {
    this.mostrarSpinner = true;
    let imgUrls = [];
    let contador = 0;
    images.forEach(imgBase64 => {
      this.storageService.subirImagenEquiposVenta(imgPath + Date.now(), imgBase64).then(urlImagen => {
        imgUrls.push(urlImagen);
        contador++;
        if (contador == images.length) {
          this.equipoVendido.images = imgUrls;
          this.dataBase.crear(environment.TABLAS.equipos_vendidos, this.equipoVendido).then(res => {
            this.toastService.simpleMessage('Existo', 'Nueva venta de equipo generada', ToastColor.success);
            this.mostrarSpinner = false;
            this.cerrarFormulario();


          }).catch(err => {
            this.toastService.simpleMessage('Error', 'No se pudo generar la venta', ToastColor.danger);
          })
        }
      }).catch(err => {
        this.toastService.simpleMessage('Error', 'al subir la image ocurrio un error', ToastColor.danger);
      });
    });
  }

}
