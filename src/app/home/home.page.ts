import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from '../services/database.service';
import { MenuController, ModalController } from '@ionic/angular';
import { EncuestaCalificacionComponent } from '../components/encuesta-calificacion/encuesta-calificacion.component';
import { FuncionesUtilesService } from '../services/funciones-utiles.service';
import { environment } from 'src/environments/environment';
import { User } from '../clases/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userLogged!: User;
  slideOpts = {
    autoplay: true,
  }



  reparaciones: any[] = [];
  reparacionesAMostrar: any[] = [];


  constructor(private modalController: ModalController,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
    private database: DataBaseService,
    private menuController: MenuController) {

    this.getCurrentUser();
    // this.mostrarFormulario();
  }


  salir() {
    this.authService.currentUser = null;
  }
  ngOnInit(): void {
    // this.agregarALaDBDiasNoCargados();
  }
  

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.userLogged = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }


  async mostrarFormulario() {
    let modal = this.modalController.create({
      component: EncuestaCalificacionComponent
    })

      ; (await modal).present();
  }

}

