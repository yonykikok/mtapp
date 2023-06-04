import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
export enum MediosDePago {
  'Efectivo' = 'efectivo',
  'Transferencia' = 'transferencia',
  'MercadoPago' = 'mercadopago',
}
export enum RecargoPorMediosDePago {
  'Efectivo' = 0,
  'Transferencia' = 8,
  'Mercado Pago' = 12,
}
export interface MedioDePago {
  nombre: MediosDePago,
  recargo: number
}
@Component({
  selector: 'app-form-detalle-venta',
  templateUrl: './form-detalle-venta.component.html',
  styleUrls: ['./form-detalle-venta.component.scss'],
})
export class FormDetalleVentaComponent implements OnInit {

  step = 1;
  medioDePago: string = MediosDePago.Efectivo;
  titularDeCuenta;
  montoAbonado;
  montoTotal = 0;
  items = [];
  item = {
    precio: null,
    boleta: '',
    descripcion: '',
  }
  porcentajeDeRecargo: RecargoPorMediosDePago = RecargoPorMediosDePago.Efectivo;
  constructor(
    private alertService: AlertService,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {

  }

  agregarItem() {
    this.items.push({ ...this.item });
    this.item = {
      precio: null,
      boleta: '',
      descripcion: '',
    }

    this.calcularMontoTotal();


  }
  calcularMontoTotal() {
    this.montoTotal = 0;
    this.items.forEach(item => {
      this.montoTotal += item.precio;
    });
  }
  showConfirmDialog() {

    this.alertService.alertConfirmacion('Finalizar Venta', 'Confirma que todos los datos estan correctos?', 'Si, confirmo', this.agregarVenta.bind(this));

  }

  agregarVenta() {
    let items = this.items.map(item => {
      console.log(this.medioDePago)
      item['medioDePago'] = this.medioDePago;
      item['precio'] = item['precio'] + ((item['precio'] / 100) * this.porcentajeDeRecargo);
      if (this.medioDePago != MediosDePago.Efectivo) {
        item['titularDeCuenta'] = this.titularDeCuenta ? this.titularDeCuenta : 'descuento';
      }

      return item;
    });
    console.log({ ...items })

    this.modalController.dismiss(items,'guardarItems');
    this.items = [];
  }
  eliminarItem(selectedItem) {
    this.items.splice(this.items.findIndex(item => selectedItem === item), 1);
    this.calcularMontoTotal();
  }
}


