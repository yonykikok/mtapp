import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  selectedImg = "";
  isModal: boolean = false;
  posicionesDiponibles: number[] = [];
  @Input() imagenes: string[] = [];
  @Input() imagenesRef: string[] = [];
  @Output() imagesListChangedEvent = new EventEmitter<any[]>()
  constructor(
    private imageCompress: NgxImageCompressService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    if (this.isModal) {
      this.controlar();
    }
  }
  controlar() {
    this.posicionesDiponibles = [];
    const imagenesRefSinRepetidos = Array.from(new Set(this.imagenesRef));
    console.log(imagenesRefSinRepetidos);
    let posiblesPosiciones = [0, 1, 2, 3];

    posiblesPosiciones.forEach(posicion => {
      let existe = false;
      imagenesRefSinRepetidos.forEach(imgRef => {

        const partes = imgRef.split('-');
        const obtenerUltimoDigito = parseInt(partes[partes.length - 1], 10);

        if (posicion == obtenerUltimoDigito) {
          existe = true
        }
      });
      if (existe) {

      } else {
        this.posicionesDiponibles.push(posicion);
        console.log("disponible: ", posicion)

      }

    });
    console.log("posiciones disponible: ", this.posicionesDiponibles)

  }

  agregarImagen(e: any) {
    if (this.imagenes.length >= 4) {
      this.imagenes = [];
    }
    let files = e.target.files;
    let maxIteration = files.length < 4 ? files.length : 4;

    for (let i = 0; i < maxIteration; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        if (this.imagenes.length < 4 && typeof reader.result == 'string') {
          this.imagenes.push(reader.result);
          this.selectedImg = this.imagenes[0];
        }
      }
    }
    this.imagesListChangedEvent.emit(this.imagenes);
  }

  compressFile() {
    if (this.imagenes.length >= 4) {
      this.imagenes = [];
    }

    const MAX_MEGABYTE = 0.5;
    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
      .then(
        (result: string) => {
          // imgResult = result;
          this.imagenes.push(result);
          this.imagenesRef.push("referencia falsa para ocupar el indice necesitado");
          //console.log(result)
          this.imagesListChangedEvent.emit(this.imagenes);
          this.selectedImg = result;
        },
        (result: string) => {
          console.info('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
          // imgResult = result;
          this.imagenes.push(result);
          this.imagenesRef.push("referencia falsa para ocupar el indice necesitado");
          //console.log(result)
          this.imagesListChangedEvent.emit(this.imagenes);
          this.selectedImg = result;
        });
  }

  removerImg() {
    let indiceABorrar = this.imagenes.findIndex(img => this.selectedImg === img);
    this.imagenes.splice(indiceABorrar, 1);
    this.selectedImg = this.imagenes[0]
    this.imagesListChangedEvent.emit(this.imagenes);

    if (this.isModal) {
      this.imagenesRef.splice(indiceABorrar, 1);
      this.controlar();
    }

  }

  continuar() {
    console.log(this.imagenes)
    let data = {
      images: this.imagenes,
      imagesRef:this.imagenesRef,
      posicionesDiponibles: this.posicionesDiponibles
    }
    this.modalController.dismiss(data, 'guardar');
  }

}
