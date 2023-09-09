import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.scss'],
})
export class DetallePedidoComponent implements OnInit {
  listaDePrioridades = ['Opcional', 'Sin stock', 'Averiguar', 'Urgente'];
  editarPrioridad = false;
  showAgregarNota = false;
  notaPedido: FormControl;
  pedido;
  constructor(
    private database: DataBaseService,
    private alertService: AlertService,
    private modalController: ModalController) {

  }

  ngOnInit(): void {
console.log(this.pedido)

  }

  mostrarConfirmacion(e) {
    this.alertService.alertConfirmacion('Confirmación', `Esta por pasar de '${this.pedido.prioridad}' a '${e.target.value}'`, 'Si, confirmar', () => {
      this.pedido.prioridad = e.target.value;
      // this.database.actualizar(environment.TABLAS.pedidos', this.pedido, this.pedido.id).then(res => {
      this.modalController.dismiss({}, 'actualizarEstado');
      // });
    })
  }

  cancelarPedido() {

    this.alertService.alertConfirmacion('Confirmación', `Si cancela el pedido, desaparecera de la lista. <br> ¿Quiere cancelarlo?`, 'Si, Cancelar pedido', () => {

      this.modalController.dismiss({}, 'cancelarPedido');
    })

  }
  agregarNotaAlPedido() {
    this.pedido['nota'] = this.notaPedido;
    this.modalController.dismiss({}, 'agregarNota');
    // this.agregarNotaEvent.emit(this.pedido);
  }

  cargarTextArea(texto) {
    this.notaPedido = texto;
  }
}
