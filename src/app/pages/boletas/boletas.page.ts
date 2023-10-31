import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { DetalleReparacionComponent } from 'src/app/components/detalles/detalle-reparacion/detalle-reparacion.component';
import { FormAltaReparacionComponent } from 'src/app/components/forms/form-alta-reparacion/form-alta-reparacion.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { boleta } from '../mis-reparaciones/mis-reparaciones.page';
import { Router } from '@angular/router';
export const enum OrderByDireccions {
  ascendente = 'asc',
  descendente = 'desc'
}
@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.page.html',
  styleUrls: ['./boletas.page.scss'],
})
export class BoletasPage implements OnInit {

  boletas: boleta[] = [];
  loggedUser: User | null = null;
  sinCoincidencias = false;

  filterValue = '';

  mostrarFormModulo = true;

  constructor(
    private authService: AuthService,
    private dataBase: DataBaseService,
    private modalController: ModalController,
    private toastService: ToastService,
    public funcionesUtiles: FuncionesUtilesService,
    private router: Router) {
    this.getCurrentUser();

  }
  ngOnInit(): void {//obtenemos las boletas modificadas del dia.
    // const fechaHoy = new Date().getTime();
    // const fechaAyer = fechaHoy - 24 * 60 * 60 * 1000; // Restamos un día
    // this.dataBase.getBoletasModificadasHoy(fechaAyer, fechaHoy).then(boletasListRef => {
    //   let boletas = boletasListRef.map(boletaRef => {
    //     let boleta = boletaRef.data();
    //     boleta['id'] = boletaRef.id;
    //     return boleta;
    //   })
    //   console.log(boletas);
    // })
  }



  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      if (!userRef||!userRef.uid) {
        this.router.navigate(["/login"]);
return;
      }
      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
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

  async openDialog() {
    try {
      const modal = await this.modalController.create({
        component: FormAltaReparacionComponent,
        componentProps: {
          ruta: 'boletas'
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        //
      })
      return await modal.present();
    } catch (err) {
    }

  }

  async seleccionar(boleta: boleta) {
    try {
      const modal = await this.modalController.create({
        component: DetalleReparacionComponent,
        componentProps: {
          reparacion: boleta,
          autoFocus: false,
          loggedUser: this.loggedUser,
          ruta: 'boletas'

        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        //
      })
      return await modal.present();
    } catch (err) {
    }

  }


  applyFilter(event: Event) {
    this.sinCoincidencias = false;
    let textoABuscar = (event.target as HTMLInputElement).value;
    if (textoABuscar.length == 4 || textoABuscar.length == 5 || textoABuscar.length == 8) {

      if ((textoABuscar.length == 4 || textoABuscar.length == 5)) {
        console.log(textoABuscar)
        this.dataBase.obtenerBoletaPorNroBoleta(environment.TABLAS.boletasReparacion, textoABuscar).then((res: any) => {
          if (!res) {
            this.sinCoincidencias = true;
            return;
          }

          let boletas = res.map((element: any) => {
            let boleta = element.data();
            boleta['id'] = element.id;
            return boleta;
          });
          this.boletas = boletas;

        });
      }
      else {
        this.dataBase.obtenerBoletaPorDni(environment.TABLAS.boletasReparacion, textoABuscar).then((res: any) => {
          if (!res) {
            this.sinCoincidencias = true;
            return;
          }

          let boletas = res.map((element: any) => {
            let boleta = element.data();
            boleta['id'] = element.id;
            return boleta;
          });
          this.boletas = boletas;

        });
      }
    }
  }
  applyFilter2(event: Event) {
    this.sinCoincidencias = false;
    let textoABuscar = (event.target as HTMLInputElement).value;
    if (textoABuscar.length == 4 || textoABuscar.length == 5 || textoABuscar.length == 8) {

      let metodoALlamar: any = (textoABuscar.length == 4 || textoABuscar.length == 5)
        ? this.dataBase.obtenerBoletaPorNroBoleta
        : this.dataBase.obtenerBoletaPorDni;

      metodoALlamar(environment.TABLAS.boletasReparacion, textoABuscar).then((res: any) => {
        if (!res) {
          this.sinCoincidencias = true;
          return;
        }

        let boletas = res.map((element: any) => {
          let boleta = element.data();
          boleta['id'] = element.id;
          return boleta;
        });
        this.boletas = boletas;

      });
    }
  }


}
