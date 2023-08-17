import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-detalle-bateria',
  templateUrl: './detalle-bateria.component.html',
  styleUrls: ['./detalle-bateria.component.scss'],
})
export class DetalleBateriaComponent implements OnInit {


  editMarca = false;
  editModelo = false;
  editCodigo = false;
  editPrecio = false;
  editCalidad = false;
  repuesto;
  clonRepuesto;

  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesBaterias;





  constructor(
    private infoConpatida: InfoCompartidaService,
    private database: DataBaseService,
    private alertService: AlertService,
    private funcionesUtilesService: FuncionesUtilesService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.clonRepuesto = this.funcionesUtilesService.clonarObjeto(this.repuesto);
  }

  mostrar(campo) {
    this.resetBanderas();
    this[campo] = true;
  }
  resetBanderas() {
    this.editMarca = false;
    this.editModelo = false;
    this.editCodigo = false;
    this.editPrecio = false;
    this.editCalidad = false;
  }


  async guardarCambios() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    try {
      console.log(this.repuesto)
      this.database.actualizar(environment.TABLAS.baterias, this.repuesto, this.repuesto.id).then(res => {
        this.toastService.simpleMessage('Error', 'Bateria actualizado con exito', ToastColor.success);
        console.log(res)
      });
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
}
