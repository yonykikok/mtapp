import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { DetalleReparacionComponent } from 'src/app/components/detalles/detalle-reparacion/detalle-reparacion.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { boleta_estados } from 'src/app/services/info-compartida.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

export interface boleta {
  completa: boolean,
  dniCliente: string,
  estado: boleta_estados,
  fechaAlta: number,
  fechaId: string,
  historial?: [{
    detalle: string,
    estadoActual: boleta_estados,
    estadoAnterior: boleta_estados,
    fecha: string,
    modificadoPor: { displayName: string, id: string }
  }],
  id?: string,
  images: string[],
  modelo: string,
  nroBoleta: string,
  telefono: string,
  fechaUltimoCambioDeEstado?:number,
  [key: string]: any;
}
@Component({
  selector: 'app-mis-reparaciones',
  templateUrl: './mis-reparaciones.page.html',
  styleUrls: ['./mis-reparaciones.page.scss'],
})
export class MisReparacionesPage implements OnInit, ViewWillEnter {
  reparaciones = [];
  loggedUser?: User;
  textoABuscar: string = '';
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
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
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

  async obtenerReparaciones(e?: any) {
    if (!this.loggedUser || !this.loggedUser.dni) {
      this.alertService.alertConfirmacion('Atención', 'Detectamos que aun no completo sus datos, para ver sus reparaciones es necesario que los complete', 'Completar datos', () => {
        this.router.navigate(['/mi-cuenta']);
      });
      return;
    }

    try {
      let documentListRef: any = await this.database.getBoletasPorDni(this.loggedUser.dni);
      if (!documentListRef) { return; };

      this.reparaciones = documentListRef.map((documentRef: any) => {
        let reparacion = documentRef.data();
        reparacion['id'] = documentRef.id;
        return reparacion;
      });
      this.reparacionesAMostrar = [...this.reparaciones];

      this.reparaciones.sort((a: any, b: any) => {
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


  async mostrarDetalle(reparacion: boleta) {
    try {
      const modal = await this.modalController.create({
        component: DetalleReparacionComponent,
        componentProps: {
          reparacion,
          ruta: '/mis-reparaciones'
        },
      })

      modal.onDidDismiss().then((result: any) => {
      })
      return await modal.present();
    } catch (err) {
    }
  }

  buscarBoleta() {
    this.reparacionesAMostrar = this.reparaciones.filter((reparacion: boleta) => {
      if (reparacion.nroBoleta.toString().toLowerCase().includes(this.textoABuscar.toLowerCase())) {
        return reparacion;
      }
      return;
    });
  }


}
