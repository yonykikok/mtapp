import { Component, Input, OnInit } from '@angular/core';
import { FormasDePago, Pago, Venta } from '../selector-de-productos/selector-de-productos.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-formas-de-pago',
  templateUrl: './formas-de-pago.component.html',
  styleUrls: ['./formas-de-pago.component.scss'],
})
export class FormasDePagoComponent implements OnInit {
  @Input() venta!: Venta;
  pagoActual: Pago = { formaDePago: FormasDePago.EFECTIVO, cantidad: 0 };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.venta)
  }

  // Añadir un pago a la venta
  agregarPago() {
    if (this.pagoActual.cantidad > 0) {
      this.venta.pagos.push({ ...this.pagoActual });
      console.log(this.venta)
      this.pagoActual = { formaDePago: FormasDePago.EFECTIVO, cantidad: 0 };
    }
  }

  // Confirmar y cerrar el modal
  confirmarPagos() {
    this.modalController.dismiss(this.venta, 'confirmar');
  }

  // Cancelar y cerrar el modal
  cancelar() {
    this.modalController.dismiss(null, 'cancelar');
  }

  // FormasDePagoComponent
  calcularTotalPagado(): number {
    return this.venta.pagos.reduce((total, pago) => total + pago.cantidad, 0);
  }
  eliminarPago(indiceDepago: number) {
    console.log(indiceDepago);
    console.log(this.venta);
    this.venta.pagos.splice(indiceDepago, 1);
  }
}