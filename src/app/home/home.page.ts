import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from '../services/database.service';
import { ModalController } from '@ionic/angular';
import { EncuestaCalificacionComponent } from '../components/encuesta-calificacion/encuesta-calificacion.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    autoplay: true,
  }



  reparaciones: any[] = [];
  reparacionesAMostrar: any[] = [];


  constructor(private modalController: ModalController) {

    // this.mostrarFormulario();
  }

  async mostrarFormulario() {
    let modal = this.modalController.create({
      component: EncuestaCalificacionComponent
    })

      ; (await modal).present();
  }

}

