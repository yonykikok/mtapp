import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { MediosDePago } from '../form-detalle-venta/form-detalle-venta.component';
import { User } from 'src/app/clases/user';

@Component({
  selector: 'app-form-agregar-pago-deuda',
  templateUrl: './form-agregar-pago-deuda.component.html',
  styleUrls: ['./form-agregar-pago-deuda.component.scss'],
})
export class FormAgregarPagoDeudaComponent implements OnInit {
  tipoDePagoSeleccionado: any;
  pagos: any[] = [];
  pagosOriginal: any[] = [];
  formGroupPago = new FormGroup({
    concepto: new FormControl('', Validators.required),
    monto: new FormControl('', Validators.required),
  });

  user!: User;
  constructor(
    public funcionesUtiles: FuncionesUtilesService,
    private alertService: AlertService,
    private modalController: ModalController
    // private confirmDialog: ConfirmDialogService,
    // @Inject(MAT_DIALOG_DATA) data
  ) {
    // this.pagos = data.pagos;
    // this.user = data.user;
  }
  ngOnInit(): void {
    this.pagosOriginal = this.funcionesUtiles.clonarObjeto(this.pagos);
  }
  seModificaronLosPagos() {
    if (JSON.stringify(this.pagosOriginal) != JSON.stringify(this.pagos)){
      return true
    }
    return false
  }
  cargarTipoDePago(e: any) {
    if (this.tipoDePagoSeleccionado != 'otro') {
      this.formGroupPago.controls.concepto.setValue(e.target.value);
    } else {
      this.formGroupPago.controls.concepto.setValue('');
    }
  }
  eliminarPago(selectedItem: any) {
    this.pagos.splice(this.pagos.findIndex(item => selectedItem === item), 1);
  }
  agregarPago() {
    let pago: any = this.formGroupPago.value;
    if (Number(pago.monto) <= 0) return;

    pago['fecha'] = Date.now();
    this.pagos.push(pago);

  }
  confirmarGuardadoDePagos() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere guardar los cambios?", 'Si, Guardar', () => {
      this.modalController.dismiss(this.pagos, 'guardarCambios');
    });

  }

  showDeletePaymentDialog(item: any) {
    this.alertService.alertConfirmacion('Confirmación', "¿Esta seguro de borrar este pago?", 'Si, borrar pago', this.eliminarPago.bind(this, item));
  }
}