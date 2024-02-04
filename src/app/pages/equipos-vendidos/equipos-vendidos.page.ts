import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormEquipoVendidoComponent } from 'src/app/components/forms/form-equipo-vendido/form-equipo-vendido.component';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { EquipoVendido } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-equipos-vendidos',
  templateUrl: './equipos-vendidos.page.html',
  styleUrls: ['./equipos-vendidos.page.scss'],
})
export class EquiposVendidosPage implements OnInit {

  // @ViewChild(MatAccordion) accordion: MatAccordion;
  listaEquiposVendidos: EquipoVendido[] = [];
  listaEquipos: any;
  mostrarImagenes = false;
  loggedUser!: User;

  moduloSeleccionado: 'vendidos' | 'disponibles' = 'vendidos';
  listaAMostrar: any;


  constructor(
    // private dialog: MatDialog,
    private storageService: StorageService,
    private database: DataBaseService,
    private authService: AuthService,
    private modalController: ModalController,
    private spinnerService: SpinnerService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    // this.openDialog();
    this.database.obtenerTodos(environment.TABLAS.equipos_vendidos).subscribe(listRef => {
      let currentDay = new Date();
      this.listaEquiposVendidos = listRef.map((equipoRef: any) => {
        let equipoVendido = equipoRef.payload.doc.data() as EquipoVendido;
        equipoVendido['id'] = equipoRef.payload.doc.id;
        equipoVendido['mostrarImagenes'] = false;
        let diferenciaEnMilisegundos = Math.abs(Number(currentDay) - Number(equipoVendido['fecha']));
        let diferenciaEnDias = Math.ceil(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));
        equipoVendido['tiempoTranscurrido'] = diferenciaEnDias;

        return equipoVendido;
      });

      console.log(this.listaEquiposVendidos)
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
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  async mostrarImagenCompleta(imagen: string) {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario = res.payload.data() as User;
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
  seleccionarModulo(modulo: "vendidos" | "disponibles") {
    this.moduloSeleccionado = modulo;
    this.listaAMostrar = this.listaEquipos[modulo];
    // this.ordenarLista(this.listaAMostrar);
  }

  async eliminarVenta(equipo: EquipoVendido) {

    this.alertService.alertConfirmacion("Confirmación", '¿Seguro de borrar esta venta?', "Si, borrar", () => {
      this.spinnerService.showLoading("Eliminando venta...");
      equipo.imgUrlsRef?.forEach(async (imgRef) => {
        try {
          let result = await this.storageService.borrarImagen(imgRef);
          console.log(result);

        } catch (error) {
          console.error(error);
        } finally {
          this.database.eliminar(environment.TABLAS.equipos_vendidos, equipo.id).finally(() => {
            this.spinnerService.stopLoading();
          });
        }
      });
    });
  }
}
