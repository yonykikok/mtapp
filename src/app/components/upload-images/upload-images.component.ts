import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  selectedImg = "";
  imagenes = [];
  @Output() imagesListChangedEvent = new EventEmitter<any[]>()
  constructor(
    private imageCompress: NgxImageCompressService
    ) { }

  ngOnInit(): void {
  }

  agregarImagen(e) {
    if (this.imagenes.length >= 4) {
      this.imagenes = [];
    }
    let files = e.target.files;
    let maxIteration = files.length < 4 ? files.length : 4;

    for (let i = 0; i < maxIteration; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onloadend = () => {
        if (this.imagenes.length < 4) {
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

    const MAX_MEGABYTE = 1.8;
    this.imageCompress
      .uploadAndGetImageWithMaxSize(MAX_MEGABYTE) // this function can provide debug information using (MAX_MEGABYTE,true) parameters
      .then(
        (result: string) => {
          // imgResult = result;
          console.log(result);
          this.imagenes.push(result);
          this.imagesListChangedEvent.emit(this.imagenes);
          this.selectedImg=result;
        },
        (result: string) => {
          console.error('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
          // imgResult = result;
          console.log(result);
          this.imagenes.push(result);
          this.imagesListChangedEvent.emit(this.imagenes);
          this.selectedImg=result;
        });
  }

  removerImg() {

    this.imagenes.splice(this.imagenes.findIndex(img => this.selectedImg === img), 1);
    this.selectedImg = this.imagenes[0]
    this.imagesListChangedEvent.emit(this.imagenes);
  }



}
