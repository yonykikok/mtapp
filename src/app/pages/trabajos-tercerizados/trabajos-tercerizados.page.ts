import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormAltaTrabajoTercerizadoComponent } from 'src/app/components/forms/form-alta-trabajo-tercerizado/form-alta-trabajo-tercerizado.component';
import { DetalleTrabajoTercerizadoComponent } from 'src/app/components/views/detalle-trabajo-tercerizado/detalle-trabajo-tercerizado.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';

export interface trabajoTercerizado {
  responsable:string,
  fecha: number,
  modelo: string,
  trabajo: string,
  boleta: number,
  detallesDelEquipo: string,
  fechaRetiro: number,
  costo: number,
  precio: number,
  reparado: boolean,
  id?: string
}
@Component({
  selector: 'app-trabajos-tercerizados',
  templateUrl: './trabajos-tercerizados.page.html',
  styleUrls: ['./trabajos-tercerizados.page.scss'],
})
export class TrabajosTercerizadosPage implements OnInit {
  loggedUser!: User;
  trabajosTercerizados: any[] = [];
  constructor(
    private authService: AuthService,
    private database: DataBaseService,
    private modalController: ModalController
  ) { }

  ionViewDidEnter(): void {
    this.getCurrentUser();
    this.database.obtenerTodos(environment.TABLAS.trabajos_tercerizados).subscribe(listEquiposTercerizadosRef => {
      let trabajosTercerizados = listEquiposTercerizadosRef.map((equipoTercerizadoRef: DocumentChangeAction<any>) => {
        let trabajoTercerizado = equipoTercerizadoRef.payload.doc.data();
        trabajoTercerizado['id'] = equipoTercerizadoRef.payload.doc.id;
        return trabajoTercerizado;
      });

      this.trabajosTercerizados = trabajosTercerizados;
    });

  }
  ngOnInit() {
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario: User = res.payload.data() as User;
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


  async abrirFormTrabajoTercerizado() {

    try {
      const modal = await this.modalController.create({
        component: FormAltaTrabajoTercerizadoComponent,
        componentProps: {
          user: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardarCambios') {

          // this.toastService.simpleMessage('Exito', 'Cambios guardados', ToastColor.success);

        }

      })
      return await modal.present();
    } catch (err) {
    }
  }

  async mostrarDetalle(trabajo: any) {

    try {
      const modal = await this.modalController.create({
        component: DetalleTrabajoTercerizadoComponent,
        componentProps: {
          loggedUser: this.loggedUser,
          trabajo
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardarCambios') {

          // this.toastService.simpleMessage('Exito', 'Cambios guardados', ToastColor.success);

        }

      })
      return await modal.present();
    } catch (err) {
    }
  }

}
