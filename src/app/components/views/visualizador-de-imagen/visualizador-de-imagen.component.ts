import { Component, OnInit } from '@angular/core';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Share } from '@capacitor/share';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-visualizador-de-imagen',
  templateUrl: './visualizador-de-imagen.component.html',
  styleUrls: ['./visualizador-de-imagen.component.scss'],
})
export class VisualizadorDeImagenComponent implements OnInit {
  isActionSheetOpen = false;
  imagen!: string;
  isModal: boolean = false;
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
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];
  constructor(public funcionesUtiles: FuncionesUtilesService) { }

  ngOnInit() { }

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
}
