import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { DetalleReparacionComponent } from 'src/app/components/detalles/detalle-reparacion/detalle-reparacion.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-mis-reparaciones',
  templateUrl: './mis-reparaciones.page.html',
  styleUrls: ['./mis-reparaciones.page.scss'],
})
export class MisReparacionesPage implements OnInit, ViewWillEnter {
  reparaciones = [];
  textoABuscar;
  reparacionesAMostrar = [];
  constructor(private database: DataBaseService,
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    if (!this.authService.currentUser) { this.router.navigate(['/login']); return }
    console.log(this.authService.currentUser)
    this.obtenerReparaciones();

  }

  async obtenerReparaciones(e?) {
    try {
      console.log(this.authService.currentUser)
      let documentListRef: any = await this.database.getBoletasPorDni(this.authService.currentUser.dni);
      console.log(documentListRef)
      if (!documentListRef) return;

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
      console.log(err);
    }

  }


  async mostrarDetalle(reparacion) {
    try {
      const modal = await this.modalController.create({
        component: DetalleReparacionComponent,
        componentProps: {
          reparacion
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)


      })
      return await modal.present();
    } catch (err) {
    }
  }

  buscarBoleta() {
    this.reparacionesAMostrar = this.reparaciones.filter(reparacion => {
      if (reparacion.nro_boleta.toString().toLowerCase().includes(this.textoABuscar.toLowerCase())) {
        return reparacion;
      }
    });
  }


}
