import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormEquipoVendidoComponent } from 'src/app/components/forms/form-equipo-vendido/form-equipo-vendido.component';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipos-vendidos',
  templateUrl: './equipos-vendidos.page.html',
  styleUrls: ['./equipos-vendidos.page.scss'],
})
export class EquiposVendidosPage implements OnInit {

  // @ViewChild(MatAccordion) accordion: MatAccordion;
  listaEquiposVendidos;
  mostrarImagenes = false;
  loggedUser;


  constructor(
    // private dialog: MatDialog,
    private database: DataBaseService,
    private authService: AuthService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.getCurrentUser();
    // this.openDialog();
    this.database.obtenerTodos(environment.TABLAS.equipos_vendidos).subscribe(listRef => {
      let currentDay = new Date();
      this.listaEquiposVendidos = listRef.map(equipoRef => {
        let equipoVendido = equipoRef.payload.doc.data();
        equipoVendido['id'] = equipoRef.payload.doc.id;
        equipoVendido['mostrarImagenes'] = false;
        let diferenciaEnMilisegundos = Math.abs(Number(currentDay) - Number(equipoVendido['fecha']));
        let diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
        equipoVendido['tiempoTranscurrido'] = diferenciaEnDias;

        return equipoVendido;
      });

      this.listaEquiposVendidos.sort((equipoA, equipoB) => {
        if (equipoA['fecha'] > equipoB['fecha']) {
          return -1;
        }
        else if (equipoA['fecha'] < equipoB['fecha']) {
          return 1;
        }
        else {
          return 0;
        }
      });
      //TODO sort fecha mas reciente.      
    });
  }
  
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: FormEquipoVendidoComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  
  }

  async mostrarImagenCompleta(imagen) {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
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
          securityCode: usuario['securityCode']
        };
      })
    })
  }

}
