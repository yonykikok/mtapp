import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormAltaServicioComponent } from 'src/app/components/forms/form-alta-servicio/form-alta-servicio.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Servicio } from 'src/app/services/info-compartida.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  @Input() modoComponent: boolean = false;
  loggedUser!: User;
  listaServicios: Servicio[] = [];
  listaServiciosAMostrar: Servicio[] = [];
  constructor(private alertService: AlertService,
    private modalController: ModalController,
    public funcionesUtilesService: FuncionesUtilesService,
    private spinnerService: SpinnerService,
    private authService: AuthService,
    private dataBase: DataBaseService) {
    this.getCurrentUser();
  }

  ngOnInit() {
    this.dataBase.obtenerTodos(environment.TABLAS.servicios).subscribe(listaServiciosRef => {
      this.listaServicios = listaServiciosRef.map(servicioRef => {
        let servicio: Servicio = servicioRef.payload.doc.data() as Servicio;
        servicio.id = servicioRef.payload.doc.id;
        return servicio;
      });
      this.listaServiciosAMostrar = [...this.listaServicios];
    })
  }
  mostrarDescripcion(servicio: any) {
    this.alertService.alertSinAccion('Descripcion', servicio.descripcion, 'OK');
  }
  verPrecioST(event: Event, servicio: any) {
    event.stopPropagation();
    this.alertService.alertSinAccion('Precio ST',
      servicio.precioDesdeST == servicio.precioHastaST
        ? `$${servicio.precioDesdeST}`
        : `$${servicio.precioDesdeST} - $${servicio.precioHastaST}`, 'OK');
  }
  eliminarServicio(event: Event, servicio: any) {
    event.stopPropagation();
    this.alertService.alertConfirmacion('Confirmación', '¿Seguro que quiere eliminar el servicio?', 'Si', () => {
      this.spinnerService.showLoading('Eliminando servicio...');
      this.dataBase.eliminar(environment.TABLAS.servicios, servicio.id).finally(() => {
        this.spinnerService.stopLoading();
      })
    });
    console.log(servicio);
  }


  async abrirFormAltaServicio() {
    try {
      const modal = await this.modalController.create({
        component: FormAltaServicioComponent,
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
  async editarServicio(event: Event, servicio: Servicio) {
    event.stopPropagation();

    console.log(servicio)
    try {
      const modal = await this.modalController.create({
        component: FormAltaServicioComponent,
        componentProps: {
          servicio,
          modoEdicion: true
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

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    console.log(query)
    this.listaServiciosAMostrar = this.listaServicios.filter((d) => d.nombre.toLowerCase().indexOf(query) > -1);
  }
}
