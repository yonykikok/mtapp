import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';

@Component({
  selector: 'app-form-agregar-item-deuda',
  templateUrl: './form-agregar-item-deuda.component.html',
  styleUrls: ['./form-agregar-item-deuda.component.scss'],
})
export class FormAgregarItemDeudaComponent implements OnInit {

  user!: User;
  items: any[] = [];
  itemsOriginal: any[] = [];
  formGroupCompra = new FormGroup({
    producto: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
  });

  constructor(
    public funcionesUtiles: FuncionesUtilesService,
    private alertService: AlertService,
    private modalController: ModalController
    // private confirmDialog: ConfirmDialogService,
    // @Inject(MAT_DIALOG_DATA) data
  ) {
    // this.items = data.items;
    // this.user=data.user;
  }
  ngOnInit(): void {
    this.itemsOriginal = this.funcionesUtiles.clonarObjeto(this.items);
  }
  seModificaronLosItems() {
    if (JSON.stringify(this.itemsOriginal) != JSON.stringify(this.items)){
      return true
    }
    return false
  }
  agregarItem() {
    let item: any = this.formGroupCompra.value;

    let existe = this.items.find(auxItem => item == auxItem);
    if (!existe) {
      item['fecha'] = Date.now();
      this.items.push(item);
    }
  }
  eliminarItem(selectedItem: any) {
    this.items.splice(this.items.findIndex(item => selectedItem === item), 1);
  }

  showDeleteItemDialog(item: any) {
    this.alertService.alertConfirmacion('Confirmación', "¿Esta seguro de borrar este articulo?", 'Si, borrar pago', this.eliminarItem.bind(this, item));
  }

  confirmarGuardadoDeCompras() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere guardar los cambios?", 'Si, Guardar', () => {
      this.modalController.dismiss(this.items, 'guardarCambios');
    });

  }
}