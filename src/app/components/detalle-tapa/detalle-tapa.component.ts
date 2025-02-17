import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService, roles } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/clases/user';
import { ModalController } from '@ionic/angular';
import { Tapa } from 'src/app/pages/lista-tapas/lista-tapas.page';
import { FormDetallesFinancierosComponent } from '../form-detalles-financieros/form-detalles-financieros.component';
@Component({
  selector: 'app-detalle-tapa',
  templateUrl: './detalle-tapa.component.html',
  styleUrls: ['./detalle-tapa.component.scss'],
})
export class DetalleTapaComponent implements OnInit {
  isActionSheetOpen = false;
  actionSheetButtons: any[] = [{
    text: 'Cambiar detalles financieros',
    icon: 'calculator-outline',
    handler: async () => {
      this.mostrarFormDetallesFinanciero();
    }
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];


  funcionesUtiles: any;
  roles = roles;
  loggedUser!: User;
  editModelo = false;
  // editPrecio = false;
  editMarca = false;
  editCalidad = false;
  editStock = false;
  editVersion = false;
  repuesto!: Tapa;
  clonRepuesto!: Tapa;
  marcas = this.infoConpatida.marcasModulos;
  colores = this.infoConpatida.coloresModulos;
  tipos = this.infoConpatida.tiposModulos;
  calidades = this.infoConpatida.calidadesFlexDecarga;
  cantidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  color = "Blanco";
  cantidad = 1;





  constructor(
    private infoConpatida: InfoCompartidaService,
    private database: DataBaseService,
    private alertService: AlertService,
    private funcionesUtilesService: FuncionesUtilesService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.clonRepuesto = this.funcionesUtilesService.clonarObjeto(this.repuesto);
  }

  mostrar(campo: 'editMarca' | 'editModelo' | 'editCalidad' | 'editStock' | 'editVersion') {
    this.resetBanderas();
    this[campo] = true;
  }
  resetBanderas() {
    this.editModelo = false;
    // this.editPrecio = false;
    this.editMarca = false;
    this.editCalidad = false;
    this.editStock = false;
    this.editVersion = false;
  }

  async guardarCambios() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    try {
      if (this.repuesto && this.repuesto.id) {
        this.database.actualizar(environment.TABLAS.flexs, this.repuesto, this.repuesto.id)?.then(res => {
          this.toastService.simpleMessage('Error', 'Flex actualizado con exito', ToastColor.success);
        });
      }
    } catch (err) {
      this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
    }
  }


  borrarArticulo() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);
    if (this.repuesto.id) {
      this.database.eliminar(environment.TABLAS.flexs, this.repuesto.id).then(() => {
        this.toastService.simpleMessage('Exito', 'Flex borrado con exito', ToastColor.success);

      }).catch(err => {
        this.toastService.simpleMessage('Error', 'No se pudo borrar el flex', ToastColor.danger);
      })
    }
  }

  showDeleteDialog() {
    this.alertService.alertConfirmacion('Confirmación', 'Si lo borra desaparecera de la lista, ¿quiere continuar?', 'Si, Borrar', this.borrarArticulo.bind(this))
  }

  showSaveDialog() {
    this.alertService.alertConfirmacion('Confirmación', '¿Esta seguro de guardar los cambios?', 'Si, Guardar cambios', this.guardarCambios.bind(this))
  }

  async mostrarFormDetallesFinanciero() {
    let modal = await this.modalController.create({
      component: FormDetallesFinancierosComponent,
      componentProps: {
        producto: this.repuesto
      }
    })
    modal.onDidDismiss().then(result => {

      if (result && result.data && result.role == 'guardarCambios') {

        this.database.actualizar(environment.TABLAS.flexs, result.data, result.data.id)?.finally(() => {
          this.toastService.simpleMessage('Exito', 'Se actualizo con exito', ToastColor.success);
        });
      }
    })
    modal.present();
  }
  mostrarOpciones() {
    console.log("EMNTRA")
    this.setOpen(true);
  }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
}
