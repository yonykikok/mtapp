import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { FormFlexDeCargaComponent, PlacaDecarga } from 'src/app/components/forms/form-flex-de-carga/form-flex-de-carga.component';
import { DetalleFlexDeCargaComponent } from 'src/app/components/views/detalle-flex-de-carga/detalle-flex-de-carga.component';
import { VisualizadorDeImagenComponent } from 'src/app/components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-lista-flex-de-carga',
  templateUrl: './lista-flex-de-carga.page.html',
  styleUrls: ['./lista-flex-de-carga.page.scss'],
})
export class ListaFlexDeCargaPage implements OnInit {
  showStockDialog: boolean = false
  placaDeCargaSeleccionada!: PlacaDecarga;


  loggedUser!: User;
  camposSeleccionados = ['modelo', 'calidad', 'precio', 'stock'];
  flexDeCargas: any[] = [];
  flexDeCargasAMostrar: any[] = [];

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
    this.flexDeCargasAMostrar = [...this.flexDeCargas];
  }
  ngOnInit(): void {
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.flexs).subscribe((docsModulosRef) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.flexDeCargas = lista;
      this.flexDeCargasAMostrar = [...this.flexDeCargas];
    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(flexDeCarga: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleFlexDeCargaComponent,
        componentProps: {
          repuesto: flexDeCarga
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
    this.flexDeCargasAMostrar = this.flexDeCargas.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormFlexDeCargaComponent,
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

  seleccionarStock(e: Event, placaDeCarga: PlacaDecarga) {
    e.stopPropagation();
    this.placaDeCargaSeleccionada = placaDeCarga;
    this.showStockDialog = true;
  }

  async actualizarModuloEnFirebase(stock: number) {
    this.placaDeCargaSeleccionada.stock = stock;
    this.showStockDialog = false;
    this.spinnerService.showLoading('Actualizando stock');
    try {
      if (this.placaDeCargaSeleccionada.id) {
        await this.dataBase.actualizar(environment.TABLAS.flexs, this.placaDeCargaSeleccionada, this.placaDeCargaSeleccionada.id);
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
          imagen: 'assets/images/placaDeCargaDorso.png',
          imagenesArray: ['assets/images/placaDeCargaDorso.png', 'assets/images/placaDeCargaFrente.png'],
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
  eliminarFlexDeCarga(flexDEcarga: PlacaDecarga) {
    this.alertService.alertConfirmacion('Confirmación', `¿Quiere eliminar el flex de carga del ${flexDEcarga.modelo}?`, 'Si', () => {
      this.spinnerService.showLoading('Eliminando Flex');
      if (flexDEcarga.id) {
        this.dataBase.eliminar(environment.TABLAS.flexs, flexDEcarga.id).finally(() => {
          this.spinnerService.stopLoading();
        });
      }
    })
  }
}
