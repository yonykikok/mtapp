import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, ModalController } from '@ionic/angular';
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
  anularRecargo = false;
  cuentasBancarias = [{
    titular: 'Haedo Adriana',
    alias: 's.t.multitask',
    CBU: '8001236549574516'
  }, {
    titular: 'Haedo Jonathan',
    alias: 'disco.choza.escudo',
    CBU: '4054654412581258'
  }];



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
    private modalController: ModalController,
    public actionSheetController: ActionSheetController
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
      item['medioDePago'] = this.medioDePago;
      item['precio'] = item['precio'] + ((item['precio'] / 100) * this.porcentajeDeRecargo);
      if (this.medioDePago != MediosDePago.Efectivo) {
        item['titularDeCuenta'] = this.titularDeCuenta ? this.titularDeCuenta : 'descuento';
      }

      return item;
    });

    this.modalController.dismiss(items, 'guardarItems');
    this.items = [];
  }
  eliminarItem(selectedItem) {
    this.items.splice(this.items.findIndex(item => selectedItem === item), 1);
    this.calcularMontoTotal();
  }

  volverAtras() {
    console.log(this.step);
    if (this.step == 2) {
      console.log("bajar pasol")
      this.step = this.step - 1;
    } else {
      console.log("cerra modal")
      this.modalController.dismiss();
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: `${this.cuentasBancarias.length > 0 ? 'Cuentas disponibles' : 'Sin cuentas disponibles'}`,
      cssClass: 'my-custom-class',
      buttons: this.cuentasBancarias.map(cuenta => {
        let actionSheet: ActionSheetButton = {
          text: cuenta.alias ? cuenta.alias + ` (${cuenta.titular})` : cuenta.CBU.toString() + ` (${cuenta.titular})`,
          handler: () => {
            this.titularDeCuenta = cuenta.alias ? cuenta.alias : cuenta.CBU;
          }
        }
        return actionSheet;
      })
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role == 'backdrop') {
      this.medioDePago = 'efectivo';
      this.porcentajeDeRecargo = 0;
    }
    console.log('onDidDismiss resolved with role', role);
  }
  verDeAnularRecargo() {
    setTimeout(() => {
      if (this.anularRecargo) {
        this.porcentajeDeRecargo = 0;
      } else {
        this.porcentajeDeRecargo = this.medioDePago == 'transferencia'
          ? 8//transferencia
          : this.medioDePago == 'mercadopago'
            ? 12//mercadopago
            : 0;//efectivo
      }
    }, 100);
  }
}


