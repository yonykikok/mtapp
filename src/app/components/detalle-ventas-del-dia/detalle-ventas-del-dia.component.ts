import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { FormDetalleVentaComponent } from '../forms/form-detalle-venta/form-detalle-venta.component';
import { environment } from 'src/environments/environment';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-detalle-ventas-del-dia',
  templateUrl: './detalle-ventas-del-dia.component.html',
  styleUrls: ['./detalle-ventas-del-dia.component.scss'],
})
export class DetalleVentasDelDiaComponent implements OnInit {
  montoIngresado = 0;
  libroDiario!: LibroDiario;
  constructor(private modalController: ModalController,
    private database: DataBaseService,
    private toastService: ToastService,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }
  async cargarMontoInicial() {
    this.libroDiario.montoInicial = Number(this.montoIngresado);
    await this.database.actualizar(environment.TABLAS.ingresos, this.libroDiario, this.libroDiario.id);
  }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
  }
  async abrirFormularioDeVenta() {
    let modal = await this.modalController.create({
      component: FormDetalleVentaComponent,
    });
    modal.onDidDismiss().then(result => {

      if (result.role == "guardarItems") {
        this.libroDiario.ventas = [...this.libroDiario.ventas, ...result.data];

        this.database.actualizar(environment.TABLAS.ingresos, this.libroDiario, this.libroDiario.id)?.then(res => {
          console.log(res);
          this.toastService.simpleMessage('Exito', 'Se agregaron las ventas al dia seleccionado', ToastColor.success);
        });
      }
    });
    modal.present();
  }
}
