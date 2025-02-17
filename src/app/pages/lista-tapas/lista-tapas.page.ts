import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { DetalleTapaComponent } from 'src/app/components/detalle-tapa/detalle-tapa.component';
import { DetallesFinancieros } from 'src/app/components/forms/form-bateria/form-bateria.component';
import { FormTapaComponent } from 'src/app/components/forms/form-tapa/form-tapa.component';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';

export interface Tapa {
  id?: string,
  calidad: string,
  modelo: string,
  marca: string,
  version?: string,
  stock: number
  detallesFinancieros: DetallesFinancieros;
}

@Component({
  selector: 'app-lista-tapas',
  templateUrl: './lista-tapas.page.html',
  styleUrls: ['./lista-tapas.page.scss'],
})

export class ListaTapasPage implements OnInit {
  @Input() modoComponent: boolean = false;


  mostrarPrecioSinColocacion: boolean = false;
  showStockDialog: boolean = false
  tapaSeleccionada!: Tapa;


  loggedUser!: User;
  camposSeleccionados = ['modelo', 'calidad', 'precio', 'stock'];
  tapas: any[] = [];
  tapasAMostrar: Tapa[] = [];

  precioDolarBlue: number = 0;
  mostrarFormModulo = true;

  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private database: DataBaseService) {

    this.getCurrentUser();
    this.tapasAMostrar = [...this.tapas];
  }
  ngOnInit(): void {
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.tapas).subscribe((docsModulosRef) => {

      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.tapas = lista;
      this.tapasAMostrar = [...this.tapas];

    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(tapa: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleTapaComponent,
        componentProps: {
          repuesto: tapa,
          funcionesUtiles: this.funcionesUtiles,
          loggedUser: this.loggedUser
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
    this.tapasAMostrar = this.tapas.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormTapaComponent,
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

  seleccionarStock(e: Event, tapa: Tapa) {
    e.stopPropagation();
    this.tapaSeleccionada = tapa;
    this.showStockDialog = true;
  }

  async actualizarModuloEnFirebase(stock: number) {
    this.tapaSeleccionada.stock = stock;
    this.showStockDialog = false;
    this.spinnerService.showLoading('Actualizando stock');
    try {
      if (this.tapaSeleccionada.id) {
        await this.dataBase.actualizar(environment.TABLAS.tapas, this.tapaSeleccionada, this.tapaSeleccionada.id);
      }
    } catch (err) {
    } finally {
      this.spinnerService.stopLoading();
    }
  }

  async mostrarImagenCompleta() {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen: 'assets/images/tapaDorso.png',
          imagenesArray: ['assets/images/tapaDorso.png', 'assets/images/tapaFrente.png'],
          isModal: true,
          // permitirGirarImagen: true,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }
  eliminarTapa(tapa: Tapa) {
    this.alertService.alertConfirmacion('Confirmación', `¿Quiere eliminar la tapa del ${tapa.modelo}?`, 'Si', () => {
      this.spinnerService.showLoading('Eliminando Tapa');
      if (tapa.id) {
        this.dataBase.eliminar(environment.TABLAS.tapas, tapa.id).finally(() => {
          this.spinnerService.stopLoading();
        });
      }
    })
  }


}
