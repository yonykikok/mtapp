import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/database.service';
import { EquipoDisponible } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-equipo-disponible',
  templateUrl: './form-equipo-disponible.component.html',
  styleUrls: ['./form-equipo-disponible.component.scss'],
})
export class FormEquipoDisponibleComponent implements OnInit {
  modoModificarEquipo: boolean = false;
  step = 2;
  imagenes: string[] = [];
  imagenesRef: string[] = [];
  equipoDisponible!: EquipoDisponible;
  mostrarSpinner = false;

  step2FormGroup: FormGroup = new FormGroup({
    detalles: new FormControl(''),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    imei: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(17)]),
    precio: new FormControl('', [Validators.required]),
  });
  step3FormGroup: FormGroup = new FormGroup({
    accesorios: new FormControl('', []),
  });
  step4FormGroup: FormGroup = new FormGroup({
    images: new FormControl('', []),
  });

  constructor(private _formBuilder: FormBuilder,
    private dataBase: DataBaseService,
    private storageService: StorageService,
    private toastService: ToastService,
    private modalController: ModalController,
    private spinnerService: SpinnerService
  ) { }

  ionViewWillEnter() {
    console.log(this.equipoDisponible)
    if (this.modoModificarEquipo) {
      this.step2FormGroup.patchValue(this.equipoDisponible);
      this.step3FormGroup.patchValue(this.equipoDisponible);
      this.step4FormGroup.patchValue(this.equipoDisponible);
      this.imagenes = this.equipoDisponible.images;
      this.imagenesRef = this.equipoDisponible.imgUrlsRef;
    }
  }
  ngOnInit(): void {
    this.step2FormGroup = this._formBuilder.group({
      detalles: ['', Validators.required],
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
    this.equipoDisponible = {
      ...this.step2FormGroup.value,
      ...this.step3FormGroup.value,
      ...this.step4FormGroup.value,
      fecha: Date.now()
    }
    console.log(this.equipoDisponible.images)
    this.uploadImages(this.equipoDisponible.images, `equipos_disponibles/`);


  }

  procesarModificacion() {
    this.spinnerService.showLoading('Modificando...');
    this.equipoDisponible = {
      ...this.equipoDisponible,
      ...this.step2FormGroup.value,
      ...this.step3FormGroup.value,
      ...this.step4FormGroup.value,
    }
    console.log(this.equipoDisponible);
    this.dataBase.actualizar(environment.TABLAS.equipos_disponibles, this.equipoDisponible, this.equipoDisponible.id)?.then(res => {
      this.spinnerService.stopLoading();
      this.modalController.dismiss();
    })

    // this.uploadImages(this.equipoDisponible.images, `equipos_disponibles/`);

  }


  cerrarFormulario() {
    this.modalController.dismiss();
  }

  uploadImages(images: any[], imgPath: string) {
    this.spinnerService.showLoading('Subiendo equipo');
    let imgUrls: string[] = [];
    let imgUrlsRef: string[] = [];//referencia para eliminar
    let contador = 0;
    images.forEach((imgBase64, index) => {
      this.storageService.subirImagen(imgPath + `${this.equipoDisponible.fecha}-${this.equipoDisponible.marca}-${this.equipoDisponible.imei}-${index}`, imgBase64).then((urlImagen) => {
        imgUrls.push(urlImagen as string);
        imgUrlsRef.push(imgPath + `${this.equipoDisponible.fecha}-${this.equipoDisponible.marca}-${this.equipoDisponible.imei}-${index}`);//referencia para eliminar
        contador++;
        if (contador == images.length) {
          this.equipoDisponible.images = imgUrls;
          this.equipoDisponible.imgUrlsRef = imgUrlsRef;//referencia para eliminar
          this.dataBase.crear(environment.TABLAS.equipos_disponibles, this.equipoDisponible).then(res => {
            this.spinnerService.stopLoading();
            this.toastService.simpleMessage('Existo', 'Nuevo equipo añadido a disponibles', ToastColor.success);
            this.cerrarFormulario();


          }).catch(err => {
            this.toastService.simpleMessage('Error', 'No se pudo agregar el equipo a "equipos disponibles"', ToastColor.danger);
          })
        }
      }).catch(err => {
        this.toastService.simpleMessage('Error', 'al subir la image ocurrio un error ("equipos disponibles")', ToastColor.danger);
      });
    });
  }

}
