import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService, roles } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { FormDetallesFinancierosComponent } from '../../form-detalles-financieros/form-detalles-financieros.component';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-detalle-modulo',
  templateUrl: './detalle-modulo.component.html',
  styleUrls: ['./detalle-modulo.component.scss'],
})
export class DetalleModuloComponent implements OnInit {
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
  ruta!: string;
  editModelo = false;
  editPrecio = false;
  editMarca = false;
  editTipo = false;
  editStock = false;
  editCalidad = false;
  repuesto!: any;//es modulo 
  clonRepuesto: any;
  marcas = this.infoConpatida.marcasModulos;
  colores = this.infoConpatida.coloresModulos;
  tipos = this.infoConpatida.tiposModulos;
  calidades = this.infoConpatida.calidadesModulos;
  cantidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  color = "Blanco";
  cantidad = 1;

  constructor(
    private infoConpatida: InfoCompartidaService,
    private database: DataBaseService,
    private alertService: AlertService,
    private funcionesUtilesService: FuncionesUtilesService,
    private toastService: ToastService,
    private modalController: ModalController,

  ) { }

  ngOnInit(): void {
    this.clonRepuesto = this.funcionesUtilesService.clonarObjeto(this.repuesto);
  }

  mostrar(campo: 'editModelo' | 'editStock' | 'editTipo' | 'editCalidad'|'editPrecio') {
    this.resetBanderas();
    this[campo] = true;
  }
  resetBanderas() {
    this.editModelo = false;
    this.editStock = false;
    this.editPrecio = false;
    this.editMarca = false;
    this.editTipo = false;
    this.editCalidad = false;
  }
  agregarNuevoColor() {
    let cantidad = this.cantidad;
    let color = this.color;
    let colorExistente = this.clonRepuesto.stock.find((stock: { color: string, cantidad: number }) => stock.color == color);

    if (!colorExistente) {
      cantidad <= 0
        ? this.toastService.simpleMessage('Error en la cantidad', 'la cantidad debe ser mayor a 0', ToastColor.warning)
        : this.clonRepuesto.stock.push({ cantidad, color });
    } else {
      colorExistente.cantidad = cantidad;
    }
  }
  resetearColores() {
    this.alertService.alertConfirmacion('Confirmación', 'Si confirma borrara todos los colores y volvera a empezar, ¿quiere continuar?', 'Si, Resetear',
      () => {
        this.clonRepuesto.stock = []
      })

  }
  guardarCambios() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);
    this.modalController.dismiss(this.repuesto, 'guardar');
  }
  borrarArticulo() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);
    this.modalController.dismiss(this.repuesto, 'borrar');
  }

  async guardarCambios2() {//si se hace el cambio, cambien en todas las pantallas donde se usa detalle modulo.
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    try {
      await this.database.actualizar(environment.TABLAS.modulos, this.repuesto, this.repuesto.id);
    } catch (err) {
      this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
    }
  }


  borrarArticulo2() {//si se hace el cambio, cambien en todas las pantallas donde se usa detalle modulo.
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    this.database.eliminar(environment.TABLAS.modulos, this.repuesto.id).then(() => {
      this.toastService.simpleMessage('Exito', 'Modulo borrado con exito', ToastColor.success);

    }).catch(err => {
      this.toastService.simpleMessage('Error', 'No se pudo borrar el modulo', ToastColor.danger);
    })
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
