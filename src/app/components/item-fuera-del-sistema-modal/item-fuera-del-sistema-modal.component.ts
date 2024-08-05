import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItemFueraDelSistema } from '../selector-de-productos/selector-de-productos.component';

@Component({
  selector: 'app-item-fuera-del-sistema-modal',
  templateUrl: './item-fuera-del-sistema-modal.component.html',
  styleUrls: ['./item-fuera-del-sistema-modal.component.scss'],
})
export class ItemFueraDelSistemaModalComponent {
  itemFuraDelSistema: ItemFueraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 1 };
  itemsFueraDelSistema: ItemFueraDelSistema[] = [];

  constructor(private modalController: ModalController) { }

  agregarItemFueraDelSistema() {
    this.itemsFueraDelSistema.push({ ...this.itemFuraDelSistema,precioTotal:this.itemFuraDelSistema.precio });
    this.itemFuraDelSistema = { precio: 0, boleta: null, descripcion: '', cantidad: 1 };
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  eliminarItem(selectedItem: any) {
    this.itemsFueraDelSistema.splice(this.itemsFueraDelSistema.findIndex(item => selectedItem === item), 1);
  }
  agregarAlCarrito() {
    this.modalController.dismiss(this.itemsFueraDelSistema, 'agregarAlCarrito');
  }

  cambiarCantidad(item: ItemFueraDelSistema, cantidad: number) {
    if (item.cantidad + cantidad >= 1) {
      item.cantidad = (item.cantidad + cantidad);
      item.precioTotal = (item.precio * item.cantidad);
    } 

  }
}
