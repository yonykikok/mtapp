import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/database.service';
import { EquipoVendido } from 'src/app/services/info-compartida.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-equipo-vendido',
  templateUrl: './form-equipo-vendido.component.html',
  styleUrls: ['./form-equipo-vendido.component.scss'],
})
export class FormEquipoVendidoComponent implements OnInit {

  step = 1;
  imagenes: string[] = [];
  equipoVendido!: EquipoVendido;
  mostrarSpinner = false;

  step1FormGroup: FormGroup = new FormGroup({
    dni: new FormControl('', [Validators.required]),
  });
  step2FormGroup: FormGroup = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    imei: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(17)]),
    precio: new FormControl('', [Validators.required]),
  });
  step3FormGroup: FormGroup = new FormGroup({
    accesorios: new FormControl(['']),
  });
  step4FormGroup: FormGroup = new FormGroup({
    images: new FormControl(['']),
  });

  constructor(private _formBuilder: FormBuilder,
    private dataBase: DataBaseService,
    // private snackBar: MatSnackBar,
    private storageService: StorageService,
    // private dialogRef: MatDialogRef<FormAltaEquipoVendidoComponent>
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    // this.step1FormGroup = this._formBuilder.group({
    //   dni: '', [Validators.required],
    // });
    // this.step2FormGroup = this._formBuilder.group({
    //   marca: '', [Validators.required],
    //   modelo: '', [Validators.required],
    //   imei: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(17)]],
    //   precio: '', [Validators.required],
    // });
    // this.step3FormGroup = this._formBuilder.group({
    //   accesorios: [''],
    // });
    // this.step4FormGroup = this._formBuilder.group({
    //   images: [''],
    // });
  }




  actualizarImagenes(images: any) {
    this.step4FormGroup.controls['images'].setValue(images);
  }

  agregarImagen(e: any) {
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
          this.imagenes.push(reader.result as string);
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
  uploadImages(images: string[], imgPath: string) {
    this.mostrarSpinner = true;
    let imgUrls: string[] = [];
    let contador = 0;
    images.forEach(imgBase64 => {
      this.storageService.subirImagenEquiposVenta(imgPath + Date.now(), imgBase64).then((urlImagen: any) => {
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
