import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Pago } from '../carritos/carritos.component';
@Component({
  selector: 'app-descontar-pago-de-item',
  templateUrl: './descontar-pago-de-item.component.html',
  styleUrls: ['./descontar-pago-de-item.component.scss'],
})
export class DescontarPagoDeItemComponent implements OnInit {
  pagosActuales: Pago[] = [];
  descuentos: Pago[] = [];
  descuentoActual!: Pago;
  totalDescontado = 0;
  totalADescontar!: number;
  pagoSeleccionado!: Pago;

  constructor(private modalController: ModalController,
    private toastService: ToastService,
    private funciones: FuncionesUtilesService
  ) {

  }

  ngOnInit() {
    this.descuentoActual = this.funciones.clonarObjeto(this.pagosActuales[0]);
    this.pagoSeleccionado = this.funciones.clonarObjeto(this.pagosActuales[0]);
    console.log(this.totalADescontar)
  }

  // Añadir un pago a la venta
  descontarPago() {
    this.descuentoActual.formaDePago = this.pagoSeleccionado.formaDePago;
    console.log(this.pagoSeleccionado)
    if (this.descuentoActual.cantidad > this.pagoSeleccionado.cantidad) {
      this.toastService.simpleMessage("Limite superado", `No puedes poner mas de ${this.pagoSeleccionado.cantidad} para este metodo`, ToastColor.warning);
      return;
    }
    let nuevoTotalDescontado = this.totalDescontado + this.descuentoActual.cantidad;

    if (nuevoTotalDescontado <= this.totalADescontar) {
     
      this.totalDescontado = nuevoTotalDescontado;
      console.log(this.totalDescontado)
      this.pagoSeleccionado.cantidad = this.pagoSeleccionado.cantidad - this.descuentoActual.cantidad;
      if (nuevoTotalDescontado == this.totalADescontar) {
        alert("Descuento completo");
        return;
      }
    } else {
      //no puedes
      console.log("no puedes descontar mas del valor del producto.");
    }
    console.log(this.descuentoActual)


  }

  // Confirmar y cerrar el modal
  confirmarPagos() {
    this.modalController.dismiss(null, 'confirmar');
  }

  // Cancelar y cerrar el modal
  cancelar() {
    this.modalController.dismiss(null, 'cancelar');
  }

  seleccionarPago(pago: Pago) {
    if (this.pagoSeleccionado.formaDePago === pago.formaDePago) {
      this.pagoSeleccionado = this.pagosActuales[0]; // Desmarcar si ya está seleccionado
    } else {
      this.pagoSeleccionado = pago;
    }
  }

}