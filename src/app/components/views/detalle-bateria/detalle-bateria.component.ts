import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService, roles } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { Bateria } from '../../forms/form-bateria/form-bateria.component';
import { User } from 'src/app/clases/user';
import { ModalController } from '@ionic/angular';
import { FormDetallesFinancierosComponent } from '../../form-detalles-financieros/form-detalles-financieros.component';


@Component({
  selector: 'app-detalle-bateria',
  templateUrl: './detalle-bateria.component.html',
  styleUrls: ['./detalle-bateria.component.scss'],
})
export class DetalleBateriaComponent implements OnInit {


  editMarca = false;
  editModelo = false;
  editCodigo = false;
  // editPrecio = false;
  editCalidad = false;
  repuesto!: Bateria;
  clonRepuesto: any;

  marcas = this.infoConpatida.marcasModulos;
  calidades = [];
  funcionesUtiles: any;
  loggedUser!: User;
  roles = roles;




  constructor(
    private infoConpatida: InfoCompartidaService,
    private database: DataBaseService,
    private alertService: AlertService,
    private funcionesUtilesService: FuncionesUtilesService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.database.obtenerPorId(environment.TABLAS.calidadesDeRepuestos, 'baterias').subscribe((res: any) => {
      this.calidades = res.payload.data().calidades;
      console.log(res.payload.data())
    });
    this.clonRepuesto = this.funcionesUtilesService.clonarObjeto(this.repuesto);
  }

  mostrar(campo: 'editMarca' | 'editModelo' | 'editCodigo' | 'editCalidad') {
    this.resetBanderas();
    this[campo] = true;
  }
  resetBanderas() {
    this.editMarca = false;
    this.editModelo = false;
    this.editCodigo = false;
    // this.editPrecio = false;
    this.editCalidad = false;
  }


  async guardarCambios() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    try {
      if (this.repuesto && this.repuesto.id) {
        this.database.actualizar(environment.TABLAS.baterias, this.repuesto, this.repuesto.id)?.then(res => {
          this.toastService.simpleMessage('Error', 'Bateria actualizado con exito', ToastColor.success);
        });
      }
    } catch (err) {
      this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
    }
  }


  borrarArticulo() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    this.database.eliminar(environment.TABLAS.baterias, this.repuesto.id).then(() => {
      this.toastService.simpleMessage('Exito', 'Bateria borrado con exito', ToastColor.success);

    }).catch(err => {
      this.toastService.simpleMessage('Error', 'No se pudo borrar el Bateria', ToastColor.danger);
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

        this.database.actualizar(environment.TABLAS.baterias, result.data, result.data.id)?.finally(() => {
          this.toastService.simpleMessage('Exito', 'Se actualizo con exito', ToastColor.success);
        });
      }
    })
    modal.present();
  }
}
