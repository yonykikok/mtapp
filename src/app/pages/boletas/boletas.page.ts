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

  boletas = [];
  loggedUser: User | null = null;
  sinCoincidencias = false;

  filterValue = '';

  mostrarFormModulo = true;

  constructor(
    private authService: AuthService,
    private dataBase: DataBaseService,
    private modalController: ModalController,
    private toastService: ToastService,
    public funcionesUtiles: FuncionesUtilesService) {
    this.getCurrentUser();

  }
  ngOnInit(): void { }



  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
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

  async seleccionar(element: Element) {
    try {
      const modal = await this.modalController.create({
        component: DetalleReparacionComponent,
        componentProps: {
          reparacion: element,
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
      let metodoALlamar = (textoABuscar.length == 4 || textoABuscar.length == 5) ? 'obtenerBoletaPorNroBoleta' : 'obtenerBoletaPorDni';

      this.dataBase[metodoALlamar](environment.TABLAS.boletasReparacion, textoABuscar).then(res => {
        if (!res) {
          this.sinCoincidencias = true;
          return;
        }

        let boletas = res.map(element => {
          let boleta = element.data();
          boleta['id'] = element.id;
          return boleta;
        });
        this.boletas = boletas;

      });
    }
  }


}
