import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-form-actualizar-item-libro-diario',
  templateUrl: './form-actualizar-item-libro-diario.component.html',
  styleUrls: ['./form-actualizar-item-libro-diario.component.scss'],
})
export class FormActualizarItemLibroDiarioComponent implements OnInit {
  item = {
    precio: null,
    boleta: '',
    descripcion: '',
  }
  constructor(private alertService: AlertService,
    private modalController: ModalController) { }

  ngOnInit() { }
  mostrarConfirmacion() {
    this.alertService.alertConfirmacion('Confirmación', '¿Seguro que quiere hacer este cambio?', 'Si', () => {
      this.modalController.dismiss(this.item, 'confirmarActualizacion');
    })
  }

  eliminarItemVenta() {
    this.alertService.alertConfirmacion('Confirmación', '¿Seguro que quiere hacer este cambio?', 'Si', () => {
      this.modalController.dismiss(null, 'eliminarItemVenta');
    })
  }
}
