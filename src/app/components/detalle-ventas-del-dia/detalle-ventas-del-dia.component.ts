import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { FormDetalleVentaComponent } from '../forms/form-detalle-venta/form-detalle-venta.component';

@Component({
  selector: 'app-detalle-ventas-del-dia',
  templateUrl: './detalle-ventas-del-dia.component.html',
  styleUrls: ['./detalle-ventas-del-dia.component.scss'],
})
export class DetalleVentasDelDiaComponent implements OnInit {

  libroDiario!: LibroDiario;
  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  async abrirFormularioDeVenta() {
    let modal = await this.modalController.create({
      component: FormDetalleVentaComponent,
    });
    modal.onDidDismiss().then(res => {
      console.log(res)
      this.libroDiario.ventas = [...this.libroDiario.ventas, ...res.data];
    });
    modal.present();
  }
}
