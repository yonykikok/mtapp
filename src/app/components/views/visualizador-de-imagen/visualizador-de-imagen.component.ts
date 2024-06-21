import { Component, OnInit } from '@angular/core';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Share } from '@capacitor/share';
import { Camera } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizador-de-imagen',
  templateUrl: './visualizador-de-imagen.component.html',
  styleUrls: ['./visualizador-de-imagen.component.scss'],
})
export class VisualizadorDeImagenComponent implements OnInit {
  permitirGirarImagen: boolean = false;
  imagenGradosRotada = 0;
  isActionSheetOpen = false;
  actualizarImagenMethod!: any;
  mostrarOpcionesIcon: boolean = false;
  imagen!: string;
  imagenesArray!: string[];
  indiceImagenMostradaActual = 0;
  isModal: boolean = false;
  ruta!: string;

  actionSheetButtons: any[] = [{
    text: 'Compartir',
    icon: 'share-social-outline',
    handler: async () => {
      try {
        await Share.share({
          title: 'Imagen tomada al equipo',
          text: 'Esta es una imagen de tu equipo',
          url: this.imagen,
          dialogTitle: 'Compartir al cliente',
        });

        console.log('Imagen compartida con éxito');
      } catch (error) {
        console.error('Error al compartir la imagen', error);
      }
    },
  }, {
    text: 'Actualizar',
    icon: 'camera-reverse-outline',
    handler: async () => {
      console.log("ENTRA");
      if (typeof this.actualizarImagenMethod === 'function') {
        await this.actualizarImagenMethod(this.indiceImagenMostradaActual);
      } else {
        console.error('actualizarImagenMethod no es una función');
      }
    }
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];
  constructor(public funcionesUtiles: FuncionesUtilesService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.actualizarImagenMethod)
    if (!this.ruta) {
      this.ruta = this.router.url;
    }
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  mostrarOpciones() {
    this.setOpen(true);
  }


  async compartir() {
    console.log("compartiendo")
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });


    // Share local file using url parameter
    // const photo = await Camera.getPhoto(options);
    // await Share.share({
    //   url: photo.path,
    // });

    // // Share multiple files using files parameter
    // const { photos } = await Camera.pickImages(options);
    // await Share.share({
    //   files: photos.map(photo => photo.path!),
    // });

  }
  girarImagen(grados: number) {
    return this.imagenGradosRotada += grados;
  }

  volver() {
    if (this.indiceImagenMostradaActual > 0) {
      this.indiceImagenMostradaActual = this.indiceImagenMostradaActual - 1;
    }
    this.imagen = this.imagenesArray[this.indiceImagenMostradaActual];

  }
  siguiente() {
    if (this.indiceImagenMostradaActual < (this.imagenesArray.length - 1)) {
      this.indiceImagenMostradaActual = this.indiceImagenMostradaActual + 1;
    }
    this.imagen = this.imagenesArray[this.indiceImagenMostradaActual];
  }
}
