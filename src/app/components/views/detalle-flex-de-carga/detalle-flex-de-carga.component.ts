import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { PlacaDecarga } from '../../forms/form-flex-de-carga/form-flex-de-carga.component';

@Component({
  selector: 'app-detalle-flex-de-carga',
  templateUrl: './detalle-flex-de-carga.component.html',
  styleUrls: ['./detalle-flex-de-carga.component.scss'],
})
export class DetalleFlexDeCargaComponent implements OnInit {

  editModelo = false;
  editPrecio = false;
  editMarca = false;
  editCalidad = false;
  editStock = false;
  editVersion = false;
  repuesto!: PlacaDecarga;
  clonRepuesto!: PlacaDecarga;
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
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.clonRepuesto = this.funcionesUtilesService.clonarObjeto(this.repuesto);
  }

  mostrar(campo: 'editMarca' | 'editModelo' | 'editPrecio' | 'editCalidad' | 'editStock' | 'editVersion') {
    this.resetBanderas();
    this[campo] = true;
  }
  resetBanderas() {
    this.editModelo = false;
    this.editPrecio = false;
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
}
