import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-detalle-modulo',
  templateUrl: './detalle-modulo.component.html',
  styleUrls: ['./detalle-modulo.component.scss'],
})
export class DetalleModuloComponent implements OnInit {

  editModelo = false;
  editPrecio = false;
  editMarca = false;
  editTipo = false;
  editStock = false;
  editCalidad = false;
  repuesto;
  clonRepuesto;
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
    let colorExistente = this.clonRepuesto.stock.find(stock => stock.color == color);

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


  async guardarCambios() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    try {
      await this.database.actualizar("modulos", this.repuesto, this.repuesto.id);
    } catch (err) {
      this.toastService.simpleMessage('Error', 'No se pudo actualizar', ToastColor.danger);
    }
  }


  borrarArticulo() {
    this.repuesto = this.funcionesUtilesService.clonarObjeto(this.clonRepuesto);

    this.database.eliminar("modulos", this.repuesto.id).then(() => {
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
}
