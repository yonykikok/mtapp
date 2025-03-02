import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Glass } from 'src/app/clases/glass';
import { User } from 'src/app/clases/user';
import { FormAltaGlassComponent } from 'src/app/components/forms/form-alta-glass/form-alta-glass.component';
import { DetalleGlassComponent } from 'src/app/components/views/detalle-glass/detalle-glass.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lista-glass',
  templateUrl: './lista-glass.page.html',
  styleUrls: ['./lista-glass.page.scss'],
})
export class ListaGlassPage implements OnInit {
  @Input() modoComponent: boolean = false;

  showStockDialog: boolean = false;
  modeloSeleccionado!: Glass;
  modeloSeleccionadoEditable!: Glass;
  loggedUser!: User;
  camposSeleccionados = ['marca', 'modelo', 'precio', 'stock'];
  glasses: Glass[] = [];
  glassesAMostrar: Glass[] = [];

  mostrarFormGlass = true;

  precioDolarBlue!: number;

  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private alertService: AlertService,
    private spinnerService: SpinnerService,
    private database: DataBaseService,
    private toastService: ToastService) {

    this.getCurrentUser();
    this.glassesAMostrar = [...this.glasses];
  }
  ionViewWillEnter() {
    this.dataBase.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });
  }
  ngOnInit(): void {

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.glasses).subscribe((docsGlasssRef: any) => {
      if (docsGlasssRef.length <= 0) return;
      lista = docsGlasssRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      lista = this.ordenarListaPor(lista, 'modelo', 'precio');
      this.glasses = lista;
      this.glassesAMostrar = [...this.glasses];
      console.log(this.glassesAMostrar)
    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(glass: Glass) {
    try {
      const modal = await this.modalController.create({
        component: DetalleGlassComponent,
        componentProps: {
          repuesto: glass,
          ruta: '/reparaciones-new-version',
          glassesCargados: this.funcionesUtiles.clonarObjeto(this.glasses),
          precioDolarBlue: this.precioDolarBlue
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardar') {
          try {
            await this.database.actualizar(environment.TABLAS.glasses, result.data, result.data.id);
          } catch (err) {
            this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
          }
        } else if (result.role == 'borrar') {
          this.database.eliminar(environment.TABLAS.glasses, result.data.id).then(() => {
            this.toastService.simpleMessage('Exito', 'Glass borrado con exito', ToastColor.success);

          }).catch((err: Error) => {
            this.toastService.simpleMessage('Error', 'No se pudo borrar el glass', ToastColor.danger);
          })
        }


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
    this.glassesAMostrar = this.glasses.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }


  async abrirFormGlass() {
    try {
      const modal = await this.modalController.create({
        component: FormAltaGlassComponent,
        componentProps: {
          glassesCargados: this.funcionesUtiles.clonarObjeto(this.glasses)
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }


  cambiarCantidad(accion: string) {
    let modelo = this.modeloSeleccionadoEditable;

    if (accion == 'aumentar') {
      modelo.stock = Number(modelo.stock) + 1
    } else {
      if (modelo.stock == 0) {
        return;
      };
      modelo.stock = Number(modelo.stock) - 1;
    }
    // this.actualizarCantidadTotal();
  }
  guardarCambios() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere modificar el stock actual?", 'Si, modificar', () => {
      this.modeloSeleccionado = this.modeloSeleccionadoEditable;
      this.showStockDialog = false;
      this.actualizarModuloEnFirebase();
    });
  }
  async actualizarModuloEnFirebase() {
    this.spinnerService.showLoading('Actualizando...');
    try {
      await this.dataBase.actualizar(environment.TABLAS.glasses, this.modeloSeleccionado, this.modeloSeleccionado.id);

    } catch (err) {
    } finally {
      this.spinnerService.stopLoading();
    }
  }
  mostrarEditorStockRapido(event: Event, glass: Glass) {
    
    this.modeloSeleccionado = glass;
    this.modeloSeleccionadoEditable = this.funcionesUtiles.clonarObjeto(glass);
    console.log(this.modeloSeleccionado);
    event.stopPropagation();
    this.showStockDialog = true;
  }
}
