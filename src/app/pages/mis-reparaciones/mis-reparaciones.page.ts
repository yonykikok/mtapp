import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { DetalleReparacionComponent } from 'src/app/components/detalles/detalle-reparacion/detalle-reparacion.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-reparaciones',
  templateUrl: './mis-reparaciones.page.html',
  styleUrls: ['./mis-reparaciones.page.scss'],
})
export class MisReparacionesPage implements OnInit, ViewWillEnter {
  reparaciones = [];
  loggedUser;
  textoABuscar;
  reparacionesAMostrar = [];
  constructor(private database: DataBaseService,
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private alertService: AlertService) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.getCurrentUser();


  }
  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode'],
          dni: usuario['dni']
        };
        this.obtenerReparaciones();
      })
    })
  }

  async obtenerReparaciones(e?) {
    if (!this.loggedUser.dni) {
      this.alertService.alertConfirmacion('Atención', 'Detectamos que aun no completo sus datos, para ver sus reparaciones es necesario que los complete', 'Completar datos', () => {
        this.router.navigate(['/mi-cuenta']);
      });
    }

    try {
      let documentListRef: any = await this.database.getBoletasPorDni(this.loggedUser.dni);
      if (!documentListRef) { return; };

      this.reparaciones = documentListRef.map(documentRef => {
        let reparacion = documentRef.data();
        reparacion['id'] = documentRef.id;
        return reparacion;
      });
      this.reparacionesAMostrar = [...this.reparaciones];

      this.reparaciones.sort((a, b) => {
        if (a.estado > b.estado) {
          return -1
        } else if (a.estado < b.estado) {
          return 1
        } else {
          return 0
        }
      });
      if (e) { e.target.complete(); }
      ;
    } catch (err) {
      console.error(err);
    }

  }


  async mostrarDetalle(reparacion) {
    try {
      const modal = await this.modalController.create({
        component: DetalleReparacionComponent,
        componentProps: {
          reparacion,
          ruta:'/mis-reparaciones'
        },
      })

      modal.onDidDismiss().then((result: any) => {
      })
      return await modal.present();
    } catch (err) {
    }
  }

  buscarBoleta() {
    this.reparacionesAMostrar = this.reparaciones.filter(reparacion => {
      if (reparacion.nroBoleta.toString().toLowerCase().includes(this.textoABuscar.toLowerCase())) {
        return reparacion;
      }
    });
  }


}
