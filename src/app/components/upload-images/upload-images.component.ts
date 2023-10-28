import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  selectedImg = "";
  imagenes: string[] = [];
  @Output() imagesListChangedEvent = new EventEmitter<any[]>()
  constructor(
    private imageCompress: NgxImageCompressService
  ) { }

  ngOnInit(): void {
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
          //console.log(result)
          this.imagesListChangedEvent.emit(this.imagenes);
          this.selectedImg = result;
        },
        (result: string) => {
          console.info('The compression algorithm didn\'t succed! The best size we can do is', this.imageCompress.byteCount(result), 'bytes')
          // imgResult = result;
          this.imagenes.push(result);
          //console.log(result)
          this.imagesListChangedEvent.emit(this.imagenes);
          this.selectedImg = result;
        });
  }

  removerImg() {

    this.imagenes.splice(this.imagenes.findIndex(img => this.selectedImg === img), 1);
    this.selectedImg = this.imagenes[0]
    this.imagesListChangedEvent.emit(this.imagenes);
  }



}
